import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import { loginAsync } from "./authSlice";
import { FormErrors, HeaderText } from "../components/ui";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    margin: "0 auto",
  },
  form: {
    display: "grid",
    gridRowGap: "1em",
  },
  button: {
    width: "10%",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
}));

const Login = () => {
  const { error } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const getErrorText = () => {
    // If there was an error in the store before landing this page, we dont want
    // to show the error here
    if (email === "") return "";
    return error?.msg;
  };

  const loginUser = () => {
    dispatch(
      loginAsync({
        email,
        password,
      })
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <HeaderText text="Sign Into Your Account" />
        <div>
          <TextField
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </div>
        <FormErrors text={getErrorText()} />
        <Button
          disabled={!email || !password}
          variant="contained"
          onClick={loginUser}
          color="primary"
          className={classes.button}
        >
          Login
        </Button>
        <Typography component="p">
          Don't have an account?{" "}
          <Link to="/account/register" className={classes.link}>
            Signup
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
