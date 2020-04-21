import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MuiSnackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { clearState } from "./uiSlice";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Snackbar = () => {
  const { open, type, message } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const closeSnackbar = () => {
    dispatch(clearState());
  };
  console.log("open inside Snackar", open);
  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: "left",
        horizontal: "bottom",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
    >
      <Alert severity={type}>{message}</Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
