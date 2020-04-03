import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import AuthenticationRoutes from "./AuthenticationRoutes";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import TopNavigation from "./TopNavigation";

const useStyles = makeStyles({
  container: {
    marginTop: "80px"
  }
});

const Layout = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Router>
      <TopNavigation />
      <div className={classes.container}>
        <Switch>
          <Route
            path="/account"
            component={
              isAuthenticated ? () => <Redirect to="/" /> : AuthenticationRoutes
            }
          />
          <Route path="/users" component={PublicRoutes} />
          <Route
            path="/"
            component={
              isAuthenticated
                ? PrivateRoutes
                : () => <Redirect to="/account/login" />
            }
          />
        </Switch>
      </div>
    </Router>
  );
};

export default Layout;
