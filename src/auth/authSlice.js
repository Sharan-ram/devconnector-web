import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  jwt: null,
  user: null,
  isLoading: false,
  error: {}
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loading(state, _) {
      state.isLoading = true;
    },
    register(state, action) {
      const { payload, error } = action;
      if (error) {
        state.error = payload;
        state.isLoading = false;
      }
      const { jwt, user } = payload;
      state = {
        isAuthenticated: true,
        jwt,
        user,
        isLoading: false,
        error: {}
      };
    },
    login(state, action) {
      const { payload, error } = action;
      if (error) {
        state.error = payload;
        state.isLoading = false;
      }
      const { jwt, user } = payload;
      state = {
        isAuthenticated: true,
        jwt,
        user,
        isLoading: false,
        error: {}
      };
    }
  }
});

export const { loading, register, login } = authSlice.actions;
export default authSlice.reducer;
