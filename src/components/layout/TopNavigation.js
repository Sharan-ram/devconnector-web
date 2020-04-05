import React from "react";
import { useSelector, useDispatch } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import CodeIcon from "@material-ui/icons/Code";
import { makeStyles } from "@material-ui/core/styles";

import { logout as logoutAction } from "../../auth/authSlice";

import { NavLink } from "../ui";

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
  logoWrapperDiv: {
    justifySelf: "start"
  },
  logoWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 10fr",
    alignItems: "center",
    gridColumnGap: "0.2em",
    fontWeight: "bold",
    fontSize: "20px"
  },
  logo: {
    display: "grid"
  },
  navLinks: {
    justifySelf: "end",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    justifyItems: "center"
  },
  developerLink: {
    justifySelf: "end",
    display: "grid",
    gridTemplateColumns: "1fr"
  }
});

const TopNavigation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
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
