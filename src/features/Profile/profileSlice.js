import { createSlice } from "@reduxjs/toolkit";

import api from "../../api";

const initialState = {
  isLoading: false,
  myProfile: null,
  userProfiles: null,
  error: null,
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
        payload: { error, errorData, myProfile },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.myProfile = myProfile;
      }
    },
    updateProfile(state, action) {
      const {
        payload: { error, errorData, myProfile },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.myProfile = myProfile;
      }
    },
    addExperience(state, action) {
      const {
        payload: { error, errorData, myProfile },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.myProfile = myProfile;
      }
    },
    editExperience(state, action) {
      const {
        payload: { error, errorData, myProfile },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.myProfile = myProfile;
      }
    },
  },
});

export const {
  loading,
  getMyProfile,
  updateProfile,
  addExperience,
  editExperience,
} = profileSlice.actions;

export const getMyProfileAsync = () => (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: getMyProfile,
    url: `${process.env.REACT_APP_API_URL}/api/profile/me`,
    stateSlice: "myProfile",
    dispatch,
  };
  api(options);
};

export const updateProfileAsync = (payload) => async (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: updateProfile,
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/api/profile`,
    payload,
    stateSlice: "myProfile",
    dispatch,
  };
  api(options);
};

export const addExperienceAsync = (payload) => async (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: addExperience,
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/api/profile/experience`,
    payload,
    stateSlice: "myProfile",
    dispatch,
  };
  api(options);
};

export const editExperienceAsync = ({ _id, ...payload }) => async (
  dispatch
) => {
  const options = {
    loadingAction: loading,
    dataAction: editExperience,
    method: "PUT",
    url: `${process.env.REACT_APP_API_URL}/api/profile/experience/${_id}`,
    payload,
    stateSlice: "myProfile",
    dispatch,
  };
  api(options);
};

export default profileSlice.reducer;
