import { createSlice } from "@reduxjs/toolkit";

import api from "../api";

const initialState = {
  isAuthenticated: false,
  jwt: null,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loading(state) {
      state.isLoading = true;
    },
    register(state, action) {
      const {
        payload: { error, errorData, jwt },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isAuthenticated = true;
        state.jwt = jwt;
        state.isLoading = false;
      }
    },
    login(state, action) {
      const {
        payload: { error, errorData, jwt },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isAuthenticated = true;
        state.jwt = jwt;
        state.isLoading = false;
      }
    },
  },
});

export const { loading, register, login } = authSlice.actions;

export const registerAsync = (payload) => async (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: register,
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/api/users`,
    payload,
    access: "public",
    stateSlice: "jwt",
    dispatch,
  };
  api(options);
};

export const loginAsync = (payload) => async (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: login,
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/api/auth`,
    payload,
    access: "public",
    stateSlice: "jwt",
    dispatch,
  };
  api(options);
};

export default authSlice.reducer;
