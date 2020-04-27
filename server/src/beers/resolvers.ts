import { Resolvers } from "@ba/schema";
import { Context } from "../context";

export const beerResolvers: Resolvers<Context> = {
  Query: {
    beer: (_, { id }, { dataSources: { beersApi } }) => beersApi.getBeer(id),
    beers: (_, { input: { page, pageSize } }, { dataSources: { beersApi } }) =>
      beersApi.getBeers({ page, pageSize }),
  },
};
