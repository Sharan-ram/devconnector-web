import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Layout from "./components/layout";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#17a2b8",
      danger: "#dc3545",
      lightColor: "#f4f4f4",
    },
  },
});

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
