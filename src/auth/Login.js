import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import { loginAsync } from "./authSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    margin: "0 auto",
  },
  form: {
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gridRowGap: "1em",
  },
  icon: {
    display: "grid",
    gridTemplateColumns: "0.3fr 10fr",
    alignItems: "center",
  },
  logo: {
    width: "1.2em",
    height: "1.5em",
  },
  signInText: {
    fontSize: "1.5em",
  },
  textField: {
    width: "100%",
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
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

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
        <div className={classes.icon}>
          <PersonIcon className={classes.logo} />
          <Typography component="p" className={classes.signInText}>
            Sign Into Your Account
          </Typography>
        </div>
        <div>
          <TextField
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            className={classes.textField}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            className={classes.textField}
          />
        </div>
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
