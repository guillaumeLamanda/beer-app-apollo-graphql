import React from "react";
import { Grommet, Box, Footer, Text } from "grommet";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components";
import { ApolloProvider } from "@apollo/react-hooks";
import { Pages } from "./pages";
import { theme } from "./theme";
import client from "./apollo/client";

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
