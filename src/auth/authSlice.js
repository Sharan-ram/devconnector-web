import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  jwt: null,
  user: null,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loading(state, _) {
      return Object.assign({}, state, {
        isLoading: true
      });
    },
    register(state, action) {
      const {
        payload: { error, errorData, jwt }
      } = action;
      if (error) {
        return Object.assign({}, state, {
          error: errorData,
          isLoading: false
        });
      }
      return Object.assign({}, state, {
        isAuthenticated: true,
        jwt,
        isLoading: false,
        error: {}
      });
    },
    login(state, action) {
      const {
        payload: { error, errorData, jwt }
      } = action;
      if (error) {
        return Object.assign({}, state, {
          error: errorData,
          isLoading: false
        });
      }
      return Object.assign({}, state, {
        isAuthenticated: true,
        jwt,
        isLoading: false,
        error: {}
      });
    }
  }
});

export const { loading, register, login } = authSlice.actions;

export const registerAsync = payload => async dispatch => {
  dispatch(loading());
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API_URL}/api/users`,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: payload
    });

    dispatch(register(res.data));
    localStorage.setItem("jwt", res.data.jwt);
  } catch (err) {
    const {
      response: { data, status }
    } = err;
    console.error(err);
    let payload = {};
    if (typeof data === String) {
      payload = {
        msg: data,
        status
      };
    } else {
      payload = {
        ...data.errors[0],
        status
      };
    }
    dispatch(register({ error: true, errorData: payload }));
  }
};

export const loginAsync = payload => async dispatch => {
  dispatch(loading());
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API_URL}/api/auth`,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: payload
    });
    dispatch(login(res.data));
    localStorage.setItem("jwt", res.data.jwt);
  } catch (err) {
    const {
      response: { data, status }
    } = err;
    console.error(err);
    let payload = {};
    if (typeof data === String) {
      payload = {
        msg: data,
        status
      };
    } else {
      payload = {
        ...data.errors[0],
        status
      };
    }
    dispatch(login({ error: true, errorData: payload }));
  }
};

export default authSlice.reducer;
