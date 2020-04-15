import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getProfileByUserIdAsync } from "../features/Profile/profileSlice";

const useProfileByUserId = (state, userId) => {
  const { isLoading, profile, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!state) {
      dispatch(getProfileByUserIdAsync(userId));
    }
  }, [dispatch, userId, state]);

  if (state?.profile) {
    return [false, state.profile, false];
  }

  return [isLoading, profile, error];
};

export default useProfileByUserId;
