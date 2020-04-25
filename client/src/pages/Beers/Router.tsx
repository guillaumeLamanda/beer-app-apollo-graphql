import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { BeerPage } from "./Beer";
import { BeersPage } from "./Beers";

export const BeersRouter: FC = () => (
  <Switch>
    <Route exact path="/beers/:beerId" component={BeerPage} />
    <Route exact path="/beers" component={BeersPage} />
  </Switch>
);
