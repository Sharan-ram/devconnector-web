import React from "react";
import { useSelector, useDispatch } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { logout as logoutAction } from "../auth/authSlice";

import { NavLink } from "./ui";

const useStyles = makeStyles({
  appBar: {
    background: "#343a40",
    minHeight: 64,
    paddingLeft: "2rem",
    paddingRight: "2rem"
  },
  container: {
    minHeight: 64
  }
});

const TopNavigation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  return (
    <AppBar className={classes.appBar}>
      <Grid
        classes={{ container: classes.container }}
        container
        justify="space-between"
        alignItems="center"
        sm={12}
        md={12}
        lg={12}
      >
        <Grid item>
          <NavLink to="/">DevConnector</NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/users/profiles/all">Developers</NavLink>
        </Grid>
        {isAuthenticated && (
          <>
            <Grid item>
              <NavLink to="/posts/all">Posts</NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/">Dashboard</NavLink>
            </Grid>
            <Grid item>
              <Button onClick={() => dispatch(logoutAction())}>Logout</Button>
            </Grid>
          </>
        )}
      </Grid>
    </AppBar>
  );
};

export default TopNavigation;
