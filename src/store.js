import { configureStore } from "@reduxjs/toolkit";
import authSlice, { login as loginAction } from "./auth/authSlice";
import profileSlice from "./features/Profile/profileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice
  }
});

const jwt = localStorage.getItem("jwt");
if (jwt !== null) {
  store.dispatch(loginAction({ jwt }));
}

export default store;
