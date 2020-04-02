import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

import { loginAsync } from "./authSlice";

const useStyles = makeStyles({
  container: {
    width: "100%"
  },
  form: {
    margin: "0 auto",
    padding: 3
  }
});

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const loginUser = () => {
    dispatch(
      loginAsync({
        email,
        password
      })
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <TextField
          type="email"
          label="Email"
          onChange={e => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button
          disabled={!email || !password}
          variant="contained"
          color="primary"
          onClick={loginUser}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
