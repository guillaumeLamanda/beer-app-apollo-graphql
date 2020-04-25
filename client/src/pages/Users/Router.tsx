import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { UsersPage } from "./Users";
import { UserPage } from "./User";

export const UsersRouter: FC = () => (
  <Switch>
    <Route exact path="/users" component={UsersPage} />
    <Route exact path="/users/:userId" component={UserPage} />
  </Switch>
);
