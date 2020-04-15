import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfileAsync } from "../features/Profile/profileSlice";

const useMyProfile = (historyState) => {
  const { isLoading, myProfile, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!historyState) {
      dispatch(getMyProfileAsync());
    }
  }, [dispatch, historyState]);

  if (historyState?.profile !== undefined) {
    return [false, historyState.profile];
  }

  return [isLoading, myProfile, error];
};

export default useMyProfile;
