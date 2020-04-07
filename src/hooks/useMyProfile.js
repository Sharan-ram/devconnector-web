import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfileAsync } from "../features/Profile/profileSlice";

const useMyProfile = () => {
  const jwt = useSelector(state => state.auth.jwt);
  const { isLoading, myProfile, error } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfileAsync({ jwt }));
  }, [jwt, dispatch]);

  return [isLoading, myProfile, error];
};

export default useMyProfile;
