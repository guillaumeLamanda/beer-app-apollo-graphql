import React from "react";
import { Grommet, Box } from "grommet";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Navbar, BeerDetail } from "./components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeType } from "grommet/themes";
import { BeersPage } from "./pages";

const resolvers: any = [];

const client = new ApolloClient({
  uri: "http://localhost:5000",
  clientState: {
    resolvers,
  },
});

const theme: ThemeType = {
  global: {
    colors: {
      brand: {
        dark: "#f4e285",
        light: "#f6a34c",
      },
      background: {
        dark: "#111111",
        light: "#FFFFFF",
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE",
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111",
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
      control: "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
    },
    font: {
      family: "Roboto",
    },
    active: {
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  layer: {
    background: {
      dark: "#111111",
      light: "#FFFFFF",
    },
  },
  heading: {
    font: {
      family: "futura",
    },
  },
  formField: {
    border: {
      color: "border",
      side: "bottom",
      size: "xsmall",
    },
    content: {
      pad: "small",
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: "medium",
      },
    },
    error: {
      color: "status-critical",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    help: {
      color: "dark-3",
      margin: {
        start: "small",
      },
    },
    label: {
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    margin: {
      bottom: "small",
    },
  },
  anchor: {
    color: {
      light: "brand",
      dark: "text-strong",
    },
  },
};

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
