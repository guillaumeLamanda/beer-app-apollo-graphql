import { ApolloServer } from "apollo-server";
import { BeersAPI } from "./beers";
import { User, Resolvers, UserLike, LikeAction } from "@ba/schema";
import schema from "@ba/schema/src/schema.graphql";
import { UserDataSource } from "./users";
import { Request } from "express";
import { getUserFromRequest, generateToken } from "./utils/authentification";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export type Context = {
  user: Pick<User, "id"> | null;
  dataSources: {
    beersApi: BeersAPI;
    userDs: UserDataSource;
  };
};

const context = ({ req }: { req: Request }): Omit<Context, "dataSources"> => {
  return {
    user: getUserFromRequest(req),
  };
};

const resolvers: Resolvers<Context> = {
  Query: {
    beer: (_, { id }, { dataSources: { beersApi } }) => beersApi.getBeer(id),
    beers: (_, { input: { page, pageSize } }, { dataSources: { beersApi } }) =>
      beersApi.getBeers({ page, pageSize }),
    user: (_, { id }, { dataSources: { userDs } }) => userDs.findById(id),
    users: (_, __, { dataSources: { userDs } }) => userDs.find(),
    me: (_, __, { user, dataSources: { userDs } }) => {
      if (!user) {
        return null;
      }
      return userDs.findById(user.id);
    },
  },
  Mutation: {
    register: async (_, args, { dataSources: { userDs } }) => {
      const user = await userDs.create(args);
      const token = generateToken(user);
      return userDs.update(user.id, { token });
    },
    login: async (_, { name }, { dataSources: { userDs } }) => {
      let user;
      try {
        user = await userDs.findByName(name);
      } catch (error) {
        user = await userDs.create({ name });
      }
      const token = generateToken(user);
      pubsub.publish("userLoggedIn", { userLoggedIn: { ...user, token } });
      return userDs.update(user.id, { token });
    },
    toogleBeerLike: async (
      _,
      { beerId },
      { user: authUser, dataSources: { userDs, beersApi } }
    ) => {
      const user = await userDs.toogleBeerLike(authUser.id, beerId);
      const beer = await beersApi.getBeer(beerId);
      const action = user.beers.some(({ id }) => id === beer.id)
        ? LikeAction.Like
        : LikeAction.Dislike;
      const userLike: UserLike = {
        user,
        beer,
        action,
      };
      pubsub.publish("userLikedABeer", { userLikedABeer: userLike });
      return user;
    },
  },
  Subscription: {
    userLoggedIn: {
      subscribe: () => pubsub.asyncIterator("userLoggedIn"),
    },
    userLikedABeer: {
      subscribe: () => pubsub.asyncIterator("userLikedABeer"),
    },
  },
  User: {
    token: (user, args, { user: authUser }, info) =>
      authUser?.id === user.id || info.path.prev?.key === "login"
        ? user.token
        : null,
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context,
  dataSources: () => ({
    beersApi: new BeersAPI(),
    userDs: new UserDataSource(),
  }),
  playground: true,
  introspection: true,
  subscriptions: {
    path: "/",
  },
});

server.listen(5000).then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 server listening at ${url}`);
  console.log(`🚀 subscriptions listening at ${subscriptionsUrl}`);
});
