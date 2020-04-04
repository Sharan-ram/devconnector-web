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
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gridAutoRows: "minmax(64px, auto)",
    alignItems: "center",
    background: "#343a40",
    paddingLeft: "2rem",
    paddingRight: "2rem"
  },
  logo: {
    justifySelf: "start"
  },
  navLinks: {
    justifySelf: "end",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    justifyItems: "center"
  }
});

const TopNavigation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  return (
    <AppBar className={classes.appBar}>
      <div className={classes.logo}>
        <NavLink to="/">DevConnector</NavLink>
      </div>
      <div className={classes.navLinks}>
        <div>
          <NavLink to="/users/profiles/all">Developers</NavLink>
        </div>
        {isAuthenticated && (
          <>
            <div>
              <NavLink to="/posts/all">Posts</NavLink>
            </div>
            <div>
              <NavLink to="/">Dashboard</NavLink>
            </div>
            <div>
              <NavLink to="#" onClick={() => dispatch(logoutAction())}>
                Logout
              </NavLink>
            </div>
          </>
        )}
      </div>
    </AppBar>
  );
};

export default TopNavigation;
