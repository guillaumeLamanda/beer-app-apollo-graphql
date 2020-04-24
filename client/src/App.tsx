import React from "react";
import { Grommet, Box } from "grommet";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Navbar, BeerDetail } from "./components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BeersPage } from "./pages";
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
          <Box pad={{ horizontal: "large" }}>
            <Switch>
              <Route exact path="/beers/:beerId" component={BeerDetail} />
              <Route exact path="/beers" component={BeersPage} />
            </Switch>
          </Box>
        </Grommet>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
