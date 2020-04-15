import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import { registerAsync } from "./authSlice";
import { FormErrors } from "../components/ui";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    margin: "0 auto",
  },
  form: {
    display: "grid",
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
    width: "20%",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
}));

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const classes = useStyles();

  const { error: apiRequestError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const registerUser = () => {
    dispatch(registerAsync({ name, email, password }));
  };

  const getErrorText = () => {
    const error = {};
    // If there was an error in the store before landing this page, we dont want
    // to show the error here
    if (email === "") return null;
    if (password !== confirmPassword) {
      error.msg = "Passwords don't match";
    }
    if (password !== "" && password.length < 6) {
      error.msg = "Password should be greater than or equal to 6 characters";
    }
    return apiRequestError?.msg;
  };

  const isButtonDisabled =
    !name.trim() || password.trim().length < 6 || password !== confirmPassword;

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <div className={classes.icon}>
          <PersonIcon className={classes.logo} />
          <Typography component="p" className={classes.signInText}>
            Create Your Account
          </Typography>
        </div>
        <div>
          <TextField
            label="Name"
            onChange={(e) => setName(e.target.value)}
            required
            variant="outlined"
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            fullWidth
            helperText="This site uses Gravatar, so if you want a profile image, use a Gravatar email"
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            fullWidth
          />
        </div>
        <div>
          <TextField
            label="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            fullWidth
          />
        </div>
        <FormErrors text={getErrorText()} />
        <Button
          disabled={isButtonDisabled}
          variant="contained"
          color="primary"
          onClick={registerUser}
          className={classes.button}
        >
          Register
        </Button>
        <Typography component="p">
          Already have an account?{" "}
          <Link to="/account/login" className={classes.link}>
            Sign In
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Register;
