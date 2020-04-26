import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { UsersRouter } from "./Users";
import { BeersRouter } from "./Beers";
import { MeRouter } from "./Me";

export const Pages: FC = () => (
  <Switch>
    <Route path="/beers" component={BeersRouter} />
    <Route path="/users" component={UsersRouter} />
    <Route path="/me" component={MeRouter} />
  </Switch>
);
