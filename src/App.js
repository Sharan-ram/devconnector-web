import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Layout from "./components/layout";

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Layout />
    </MuiPickersUtilsProvider>
  );
}

export default App;
