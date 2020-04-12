import { createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  isLoading: false,
  posts: null,
  error: null,
  post: null,
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
    likeOrUnlike(state, action) {
      const {
        payload: { error, errorData, post },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        const postIndex = state.posts.findIndex(
          (statePost) => statePost._id === post._id
        );
        state.posts[postIndex] = post;
      }
    },
    getPostById(state, action) {
      const {
        payload: { error, errorData, post },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.post = post;
      }
    },
    addComment(state, action) {
      const {
        payload: { error, errorData, post },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.post = post;
      }
    },
    deleteComment(state, action) {
      const {
        payload: { error, errorData, post },
      } = action;
      if (error) {
        state.error = errorData;
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.post = post;
      }
    },
  },
});

export const {
  loading,
  getAllPosts,
  createPost,
  likeOrUnlike,
  getPostById,
  addComment,
  deleteComment,
} = postSlice.actions;

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

export const handleLikeOrUnlikeAsync = ({ url, ...payload }) => (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: likeOrUnlike,
    method: "PUT",
    url,
    stateSlice: "post",
    payload,
    dispatch,
  };
  api(options);
};

export const getPostByIdAsync = (postId) => (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: getPostById,
    url: `${process.env.REACT_APP_API_URL}/api/posts/${postId}`,
    stateSlice: "post",
    dispatch,
  };
  api(options);
};

export const addCommentAsync = ({ postId, ...payload }) => (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: addComment,
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/api/posts/${postId}/comment`,
    stateSlice: "post",
    payload,
    dispatch,
  };
  api(options);
};

export const deleteCommentAsync = ({ postId, commentId }) => (dispatch) => {
  const options = {
    loadingAction: loading,
    dataAction: deleteComment,
    method: "DELETE",
    url: `${process.env.REACT_APP_API_URL}/api/posts/${postId}/comment/${commentId}`,
    stateSlice: "post",
    dispatch,
  };
  api(options);
};

export default postSlice.reducer;
