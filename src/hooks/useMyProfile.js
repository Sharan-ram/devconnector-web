import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfileAsync } from "../features/Profile/profileSlice";

const useMyProfile = () => {
  const { isLoading, myProfile, error } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfileAsync());
  }, [dispatch]);

  return [isLoading, myProfile, error];
};

export default useMyProfile;
