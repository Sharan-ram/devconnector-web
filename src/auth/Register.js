import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

import Dashboard from "../features/Dashboard";

import { registerAsync } from "./authSlice";

const useStyles = makeStyles({
  container: {
    width: "100%"
  },
  form: {
    margin: "0 auto",
    padding: 3
  }
});

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const classes = useStyles();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const registerUser = () => {
    dispatch(registerAsync({ name, email, password }));
  };

  // if (isAuthenticated) {
  //   return <Dashboard />;
  // }

  // const isButtonDisabled =
  //   !name.trim() || password.trim().length < 6 || password !== confirmPassword;

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <TextField
          label="Name"
          onChange={e => setName(e.target.value)}
          fullWidth
          required
        />
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
        <TextField
          label="Confirm Password"
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
          fullWidth
          required
        />
        <Button
          // disabled={isButtonDisabled}
          variant="contained"
          color="primary"
          onClick={registerUser}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
