import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import CodeIcon from "@material-ui/icons/Code";
import { makeStyles } from "@material-ui/core/styles";

import { NavLink } from "../ui";

const useStyles = makeStyles({
  appBar: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gridAutoRows: "minmax(64px, auto)",
    alignItems: "center",
    background: "#343a40",
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
  logoWrapperDiv: {
    justifySelf: "start",
  },
  logoWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 10fr",
    alignItems: "center",
    gridColumnGap: "0.2em",
    fontWeight: "bold",
    fontSize: "20px",
  },
  logo: {
    display: "grid",
  },
  navLinks: {
    justifySelf: "end",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    justifyItems: "center",
  },
  developerLink: {
    justifySelf: "end",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    justifyItems: "center",
  },
});

const TopNavigationComponent = ({ location: { pathname } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <AppBar className={classes.appBar}>
      <div className={classes.logoWrapperDiv}>
        <NavLink to="/" className={classes.logoWrapper}>
          <div className={classes.logo}>
            <CodeIcon style={{ fontSize: "2rem" }} />
          </div>
          <div>DevConnector</div>
        </NavLink>
      </div>
      <div
        className={isAuthenticated ? classes.navLinks : classes.developerLink}
      >
        <div>
          <NavLink to="/users/profiles/all">Developers</NavLink>
        </div>
        {isAuthenticated ? (
          <>
            <div>
              <NavLink to="/posts">Posts</NavLink>
            </div>
            <div>
              <NavLink to="/">Dashboard</NavLink>
            </div>
            <div>
              <NavLink to="#" onClick={() => dispatch({ type: "LOGOUT" })}>
                Logout
              </NavLink>
            </div>
          </>
        ) : pathname === "/account/login" ? (
          <div>
            <NavLink to="/account/register">Signup</NavLink>
          </div>
        ) : (
          <div>
            <NavLink to="/login">Login</NavLink>
          </div>
        )}
      </div>
    </AppBar>
  );
};

const TopNavigation = withRouter(TopNavigationComponent);

export default TopNavigation;
