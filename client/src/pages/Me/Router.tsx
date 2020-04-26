import React from "react";
import { Switch, Route } from "react-router-dom";
import { MePage } from "./Me";

export const MeRouter = () => (
  <Switch>
    <Route exact path="/me" component={MePage} />
  </Switch>
);
