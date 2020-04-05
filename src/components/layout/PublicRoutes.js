import React from "react";
import { Route, Switch } from "react-router-dom";

import { UserProfiles } from "../../features/Profile";

const PublicRoutes = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}/profiles/all`} component={UserProfiles} />
    </Switch>
  );
};

export default PublicRoutes;
