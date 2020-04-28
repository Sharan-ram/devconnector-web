import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import useMyProfile from "../../hooks/useMyProfile";
import { editEducationAsync, deleteEducationAsync } from "./profileSlice";
import EducationForm from "./EducationForm";
import { Loader } from "../../components/ui";
import { showSnackbar } from "../../components/ui/uiSlice";

const EditEducation = ({
  history: {
    location: { state },
  },
}) => {
  const [isProfileLoading, profile] = useMyProfile(state);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [educationDeleted, setEducationDeleted] = useState(false);
  const { isLoading, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  if (!state) return <Redirect to="/" />;

  if (isProfileLoading) return <Loader />;

  if (profile === null) return null;

  const { educationId } = state;
  const education = profile.education.find((edu) => edu._id === educationId);
  /* When url is entered directly with wrong education id without navigating
    from dashboard
  */
  if (!education) return <Redirect to="/" />;

  const editEducation = (education) => {
    dispatch(editEducationAsync(education));
    setFormSubmitted(true);
  };

  const deleteEducation = (id) => {
    dispatch(deleteEducationAsync(id));
    setEducationDeleted(true);
  };

  if (formSubmitted && !isLoading) {
    if (!error) {
      dispatch(
        showSnackbar({
          message: "Education edited successfully!",
          type: "success",
        })
      );
      return <Redirect to="/" />;
    }
  }

  if (educationDeleted && !isLoading) {
    if (!error) {
      dispatch(
        showSnackbar({
          message: "Education deleted successfully!",
          type: "success",
        })
      );
      return <Redirect to="/" />;
    }
  }

  return (
    <EducationForm
      type="edit"
      education={education}
      dispatchFunction={editEducation}
      deleteEducation={deleteEducation}
    />
  );
};

export default EditEducation;
