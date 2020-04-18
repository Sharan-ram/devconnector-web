import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  loader: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
});
const Loader = () => {
  const classes = useStyle();
  return <CircularProgress className={classes.loader} />;
};

export default Loader;
