import { ApolloServer } from "apollo-server";
import { BeersAPI, beerResolvers } from "./beers";
import schema from "@ba/schema/src/schema.graphql";
import { UserDataSource, userResolvers } from "./users";
import { context } from "./context";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: [beerResolvers, userResolvers],
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
  engine: {
    apiKey: "service:beer-app:9InEDVu61S_LUla6cDpWWw",
  },
});

server.listen(5000).then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 server listening at ${url}`);
  console.log(`🚀 subscriptions listening at ${subscriptionsUrl}`);
});
