import React from "react";

import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "0.3fr 10fr",
    alignItems: "center",
  },
  icon: {
    width: "1.2em",
    height: "1.5em",
  },
  text: {
    fontSize: "1.5em",
  },
});

const HeaderText = ({ Icon = PersonIcon, text }) => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <Icon className={classes.icon} />
      <Typography component="p" className={classes.text}>
        {text}
      </Typography>
    </div>
  );
};

export default HeaderText;
