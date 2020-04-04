import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  link: {
    "text-decoration": "none"
  },
  text: {
    fontSize: 16,
    color: "#ffffff"
  }
});

const NavLink = ({ to, children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Link {...rest} to={to} className={classes.link}>
      <Typography component="span" className={cx(classes.text, className)}>
        {children}
      </Typography>
    </Link>
  );
};

export default NavLink;
