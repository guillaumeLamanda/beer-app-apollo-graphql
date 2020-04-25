import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { Box } from "grommet";
import { UsersRouter } from "./Users";
import { BeersRouter } from "./Beers";

export const Pages: FC = () => (
  <Box pad={{ horizontal: "large" }}>
    <Switch>
      <Route path="/beers" component={BeersRouter} />
      <Route path="/users" component={UsersRouter} />
    </Switch>
  </Box>
);
