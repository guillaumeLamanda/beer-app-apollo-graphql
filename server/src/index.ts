import { ApolloServer, Config, AuthenticationError } from "apollo-server";
import { BeersAPI } from "./beers";
import { User, Resolvers } from "@ba/schema";
import schema from "@ba/schema/src/schema.graphql";
import { UserDataSource } from "./users";
import { Request } from "express";
import { getUserFromRequest, generateToken } from "./utils/authentification";

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
      const user =
        (await userDs.findByName(name)) || (await userDs.create({ name }));
      const token = generateToken(user);
      return userDs.update(user.id, { token });
    },
    toogleBeerLike: (_, { beerId }, { user, dataSources: { userDs } }) =>
      userDs.toogleBeerLike(user.id, beerId),
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
});

server.listen(5000).then(({ url }) => {
  console.log(`🚀 server listening at ${url}`);
});
