import React from "react";
import { Route, Switch } from "react-router-dom";

import { MyProfile } from "../../features/Profile";
import { Posts } from "../../features/Post";
import Dashboard from "../../features/Dashboard";

const PrivateRoutes = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}profile/me`} component={MyProfile} />
      <Route exact path={`${path}posts/all`} component={Posts} />
      <Route component={Dashboard} />
    </Switch>
  );
};

export default PrivateRoutes;
