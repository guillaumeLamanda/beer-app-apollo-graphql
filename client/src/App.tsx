import React from "react";
import { Grommet } from "grommet";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Pages } from "./pages";
import { theme } from "./theme";

const resolvers: any = [];

const client = new ApolloClient({
  uri: "http://localhost:5000",
  clientState: {
    resolvers,
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Grommet plain theme={theme}>
          <Navbar />
          <Pages />
        </Grommet>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
