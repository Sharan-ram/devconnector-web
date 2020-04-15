import React from "react";
import cx from "classnames";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    alignItems: "center",
    justifyContent: "start",
    paddingLeft: "0.5em",
    background: theme.palette.primary.danger,
    minHeight: 50,
    color: theme.palette.primary.lightColor,
  },
}));

const FormErrors = ({ text, className }) => {
  const classes = useStyle();
  if (!text) return null;
  return (
    <div className={cx(classes.container, className)}>
      <Typography component="p">{text}</Typography>
    </div>
  );
};

export default FormErrors;
