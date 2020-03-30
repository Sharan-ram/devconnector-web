import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";

const AuthenticationRoutes = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}/login`} component={Login} />
      <Route exact path={`${path}/register`} component={Register} />
    </Switch>
  );
};

export default AuthenticationRoutes;
