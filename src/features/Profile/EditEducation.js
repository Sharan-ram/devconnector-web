import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import useMyProfile from "../../hooks/useMyProfile";
import { editEducationAsync, deleteEducationAsync } from "./profileSlice";
import EducationForm from "./EducationForm";

const EditEducation = ({
  match: {
    params: { id },
  },
}) => {
  const [isLoading, profile] = useMyProfile();
  const [redirectToDashboard, setRedirect] = useState(false);
  const dispatch = useDispatch();

  if (isLoading) return <div>Loading profile...</div>;

  if (profile === null) return null;

  if (redirectToDashboard) return <Redirect to="/" />;

  const education = profile.education.find((exp) => exp._id === id);

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
