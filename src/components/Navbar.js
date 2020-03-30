import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";

import { login } from "../auth/authSlice";

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <AppBar>
      <Toolbar>
        {!isAuthenticated && <Link to="/login">Login</Link>}
        {isAuthenticated && <Button onClick={() => login()}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
