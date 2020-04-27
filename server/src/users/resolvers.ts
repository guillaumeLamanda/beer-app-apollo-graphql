import { Resolvers, LikeAction, ResolversTypes } from "@ba/schema";
import { Context } from "../context";
import { generateToken } from "../utils/authentification";
import { PubSub } from "apollo-server";

const pubsub = new PubSub();
export const userResolvers: Resolvers<Context> = {
  Query: {
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
      const token = generateToken(user.id);
      return userDs.update(user.id, { token });
    },
    login: async (_, { name }, { dataSources: { userDs } }) => {
      const user =
        (await userDs.findByName(name)) || (await userDs.create({ name }));
      const token = generateToken(user.id);
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
      const userLike: ResolversTypes["UserLike"] = {
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
    beers: (user, args, { dataSources: { beersApi } }) =>
      beersApi.getBeersByIds(user.beers.map(({ beerId }) => beerId)),
  },
};
