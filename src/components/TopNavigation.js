import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";

import { logout as logoutAction } from "../auth/authSlice";

const TopNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  return (
    <AppBar>
      <Toolbar>
        <Link to="/">DevConnector</Link>
        <div>
          <Link to="/users/profiles/all">Developers</Link>
          {isAuthenticated && (
            <>
              <Link to="/posts/all">Posts</Link>
              <Link to="/">Dashboard</Link>
              <Button onClick={() => dispatch(logoutAction())}>Logout</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigation;
