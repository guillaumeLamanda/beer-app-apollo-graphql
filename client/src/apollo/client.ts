import { ApolloClient } from "apollo-boost";
import link from "./links";
import resolvers from "./resolvers";
import cache from "./cache";
import typeDefs from "./typeDefs";

const client = new ApolloClient({
  link,
  resolvers,
  cache,
  typeDefs,
});

export default client;
