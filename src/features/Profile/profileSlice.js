import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import api from "../../api";

const initialState = {
  isLoading: false,
  myProfile: null,
  userProfiles: null,
  error: null
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    loading(state, _) {
      state.isLoading = true;
    },
    getMyProfile(state, action) {
      const {
        payload: { error, errorData, profile }
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.myProfile = profile;
      }
    },
    updateProfile(state, action) {
      const {
        payload: { error, errorData, profile }
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.myProfile = profile;
      }
    }
  }
});

export const { loading, getMyProfile, updateProfile } = profileSlice.actions;

export const getMyProfileAsync = () => dispatch => {
  const options = {
    loadingAction: loading,
    dataAction: getMyProfile,
    url: `${process.env.REACT_APP_API_URL}/api/profile/me`,
    stateSlice: "profile",
    dispatch
  };
  api(options);
};

export const updateProfileAsync = payload => async dispatch => {
  dispatch(loading());
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/api/profile`,
      headers: {
        "x-auth-token": payload.jwt
      },
      data: payload.profile
    });
    dispatch(getMyProfile({ profile: res.data }));
  } catch (err) {
    console.error(err);
    const {
      response: { data, status }
    } = err;
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
    dispatch(updateProfile({ error: true, errorData: payload }));
  }
};

export default profileSlice.reducer;
