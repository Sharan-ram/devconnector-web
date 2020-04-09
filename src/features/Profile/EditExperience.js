import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import useMyProfile from "../../hooks/useMyProfile";
import { editExperienceAsync } from "./profileSlice";
import ExperienceForm from "./ExperienceForm";

const EditExperience = ({
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

  const experience = profile.experience.find((exp) => exp._id === id);

  const editExperience = (experience) => {
    dispatch(editExperienceAsync(experience));
    setRedirect(true);
  };

  return (
    <ExperienceForm
      type="edit"
      experience={experience}
      dispatchFunction={editExperience}
    />
  );
};

export default EditExperience;
