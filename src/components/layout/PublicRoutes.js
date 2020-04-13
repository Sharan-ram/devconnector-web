import React from "react";
import { Route, Switch } from "react-router-dom";

import { UserProfiles, SingleProfile } from "../../features/Profile";

const PublicRoutes = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}/profiles/all`} component={UserProfiles} />
      <Route exact path={`${path}/profiles/:id`} component={SingleProfile} />
    </Switch>
  );
};

export default PublicRoutes;
