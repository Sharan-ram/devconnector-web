import { createSlice } from "@reduxjs/toolkit";

import api from "../../api";

const initialState = {
  isLoading: false,
  myProfile: null,
  userProfiles: null,
  error: null,
  profile: null,
  isGithubReposLoading: false,
  githubRepos: null,
};

const updateProfileData = (state, action) => {
  const {
    payload: { error, errorData, myProfile },
  } = action;
  if (error) {
    state.error = errorData;
    state.isLoading = false;
  } else {
    state.isLoading = false;
    state.myProfile = myProfile;
    state.error = null;
  }
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    loading(state, _) {
      state.isLoading = true;
    },
    getAllProfiles(state, action) {
      const {
        payload: { error, errorData, userProfiles },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.userProfiles = userProfiles;
      }
    },
    getProfileByUserId(state, action) {
      const {
        payload: { error, errorData, profile },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.profile = profile;
      }
    },
    getMyProfile(state, action) {
      updateProfileData(state, action);
    },
    updateProfile(state, action) {
      updateProfileData(state, action);
    },
    addExperience(state, action) {
      updateProfileData(state, action);
    },
    editExperience(state, action) {
      updateProfileData(state, action);
    },
    deleteExperience(state, action) {
      updateProfileData(state, action);
    },
    addEducation(state, action) {
      updateProfileData(state, action);
    },
    editEducation(state, action) {
      updateProfileData(state, action);
    },
    deleteEducation(state, action) {
      updateProfileData(state, action);
    },
    githubReposLoading(state, _) {
      state.isGithubReposLoading = false;
    },
    getGithubRepos(state, action) {
      const {
        payload: { error, errorData, githubRepos },
      } = action;
      if (error) {
        state.isGithubReposLoading = false;
        state.error = errorData;
      } else {
        state.isGithubReposLoading = false;
        state.githubRepos = githubRepos;
      }
    },
  },
});

export const {
  loading,
  githubReposLoading,
  getAllProfiles,
  getProfileByUserId,
  getMyProfile,
  updateProfile,
  addExperience,
  editExperience,
  deleteExperience,
  addEducation,
  editEducation,
  deleteEducation,
  getGithubRepos,
} = profileSlice.actions;

export const getAllProfilesAsync = () => (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: getAllProfiles,
    access: "public",
    url: `${process.env.REACT_APP_API_URL}/api/profile`,
    stateSlice: "userProfiles",
    dispatch,
  };
  api(options);
};

export const getProfileByUserIdAsync = (id) => (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: getProfileByUserId,
    access: "public",
    url: `${process.env.REACT_APP_API_URL}/api/profile/user/${id}`,
    stateSlice: "profile",
    dispatch,
  };
  api(options);
};

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

export const deleteExperienceAsync = (id) => async (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: deleteExperience,
    method: "DELETE",
    url: `${process.env.REACT_APP_API_URL}/api/profile/experience/${id}`,
    stateSlice: "myProfile",
    dispatch,
  };
  api(options);
};

export const addEducationAsync = (payload) => async (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: addEducation,
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/api/profile/education`,
    payload,
    stateSlice: "myProfile",
    dispatch,
  };
  api(options);
};

export const editEducationAsync = ({ _id, ...payload }) => async (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: editEducation,
    method: "PUT",
    url: `${process.env.REACT_APP_API_URL}/api/profile/education/${_id}`,
    payload,
    stateSlice: "myProfile",
    dispatch,
  };
  api(options);
};

export const deleteEducationAsync = (id) => async (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: deleteEducation,
    method: "DELETE",
    url: `${process.env.REACT_APP_API_URL}/api/profile/education/${id}`,
    stateSlice: "myProfile",
    dispatch,
  };
  api(options);
};

export const getGithubReposAsync = (username) => async (dispatch) => {
  const options = {
    loadingAction: githubReposLoading,
    dataAction: getGithubRepos,
    access: "public",
    url: `${process.env.REACT_APP_API_URL}/api/profile/github/${username}`,
    stateSlice: "githubRepos",
    dispatch,
  };
  api(options);
};

export default profileSlice.reducer;
