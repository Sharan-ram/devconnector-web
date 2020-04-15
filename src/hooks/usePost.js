import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPostByIdAsync } from "../features/Post/postSlice";

const usePost = (state, postId) => {
  const { isLoading, post, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state) {
      dispatch(getPostByIdAsync(postId));
    }
  }, [dispatch, postId, state]);

  if (state?.post) {
    return [false, state.post, false];
  }

  return [isLoading, post, error];
};

export default usePost;
