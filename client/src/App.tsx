import React from "react";
import { Grommet, Box, Footer, Text } from "grommet";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components";
import { ApolloProvider } from "@apollo/react-hooks";
import { Pages } from "./pages";
import { theme } from "./theme";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloClient, Resolvers } from "apollo-client";
import { InMemoryCache, gql } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { meQuery, TMeData } from "./hooks";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:5000/graphql",
  options: {
    reconnect: true,
  },
});

const authLink = setContext((operation, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const cache = new InMemoryCache();

cache.writeData({
  data: {
    beers: [],
  },
});

const resolvers: Resolvers = {
  Beer: {
    isLiked: (beer, args, { cache }: { cache: InMemoryCache }) => {
      const data = cache.readQuery<TMeData>({ query: meQuery });
      if (data?.me?.beers.some(({ id }) => id === beer.id)) {
        return true;
      }
      return false;
    },
  },
};

const typeDefs = gql`
  extend type Beer {
    isLiked: Boolean!
  }
`;

const client = new ApolloClient({
  link,
  resolvers,
  cache,
  typeDefs,
});

function App() {
  return (
    <Grommet full theme={theme}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Box fill>
            <Navbar />
            <Box fill pad={{ horizontal: "large" }}>
              <Pages />
            </Box>
            <Footer pad="large" background="dark-1" justify="center">
              <Text
                color="text-weak"
                size="small"
              >{`Avec ♥️ par Guillaume Lamanda pour le BrestJS`}</Text>
            </Footer>
          </Box>
        </BrowserRouter>
      </ApolloProvider>
    </Grommet>
  );
}

export default App;
