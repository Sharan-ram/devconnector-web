import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice, { login as loginAction } from "./auth/authSlice";
import profileSlice from "./features/Profile/profileSlice";

const appReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  localStorage.removeItem("jwt");

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer
});

const jwt = localStorage.getItem("jwt");
if (jwt !== null) {
  store.dispatch(loginAction({ jwt }));
}

export default store;
