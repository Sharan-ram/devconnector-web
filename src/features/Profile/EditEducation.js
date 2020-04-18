import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import useMyProfile from "../../hooks/useMyProfile";
import { editEducationAsync, deleteEducationAsync } from "./profileSlice";
import EducationForm from "./EducationForm";
import { Loader } from "../../components/ui";

const EditEducation = ({
  history: {
    location: { state },
  },
}) => {
  const [isLoading, profile] = useMyProfile(state);
  const [redirectToDashboard, setRedirect] = useState(false);
  const dispatch = useDispatch();

  if (!state) return <Redirect to="/" />;

  if (isLoading) return <Loader />;

  if (profile === null) return null;

  const { educationId } = state;
  const education = profile.education.find((edu) => edu._id === educationId);
  if (!education || redirectToDashboard) return <Redirect to="/" />;

  const editEducation = (education) => {
    dispatch(editEducationAsync(education));
    setRedirect(true);
  };

  const deleteEducation = (id) => {
    dispatch(deleteEducationAsync(id));
    setRedirect(true);
  };

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
