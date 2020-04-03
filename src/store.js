import { configureStore } from "@reduxjs/toolkit";
import authSlice, { login as loginAction } from "./auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice
  }
});

const jwt = localStorage.getItem("jwt");
if (jwt !== null) {
  store.dispatch(loginAction({ jwt }));
}

export default store;
