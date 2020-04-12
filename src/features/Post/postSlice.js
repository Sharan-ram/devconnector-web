import { createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  isLoading: false,
  posts: null,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    loading(state) {
      state.isLoading = true;
    },
    getAllPosts(state, action) {
      const {
        payload: { error, errorData, posts },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.posts = posts;
      }
    },
    createPost(state, action) {
      const {
        payload: { error, errorData, newPost },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.posts =
          state.posts === null ? [newPost] : [newPost, ...state.posts];
      }
    },
  },
});

export const { loading, getAllPosts, createPost } = postSlice.actions;

export const getAllPostsAsync = () => (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: getAllPosts,
    url: `${process.env.REACT_APP_API_URL}/api/posts/all`,
    stateSlice: "posts",
    dispatch,
  };
  api(options);
};

export const createPostAsync = (payload) => (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: createPost,
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/api/posts`,
    stateSlice: "newPost",
    payload,
    dispatch,
  };
  api(options);
};

export default postSlice.reducer;
