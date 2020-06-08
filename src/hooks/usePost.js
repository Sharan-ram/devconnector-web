import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { getPostByIdAsync } from "../features/Post/postSlice";

const usePost = (state, postId) => {
  const { isLoading, post, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostByIdAsync(postId));
  }, [dispatch, postId, state]);

  return [isLoading, post, error];
};

export default usePost;
