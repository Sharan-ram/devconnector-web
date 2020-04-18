import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import useMyProfile from "../../hooks/useMyProfile";
import { editExperienceAsync, deleteExperienceAsync } from "./profileSlice";
import ExperienceForm from "./ExperienceForm";

import { Loader } from "../../components/ui";

const EditExperience = ({
  history: {
    location: { state },
  },
}) => {
  const [redirectToDashboard, setRedirect] = useState(false);
  const [isLoading, profile] = useMyProfile(state);
  const dispatch = useDispatch();

  if (!state) return <Redirect to="/" />;

  if (isLoading) return <Loader />;

  if (profile === null) return null;

  const { experienceId } = state;
  const experience = profile.experience.find((exp) => exp._id === experienceId);
  if (!experience || redirectToDashboard) return <Redirect to="/" />;

  const editExperience = (experience) => {
    dispatch(editExperienceAsync(experience));
    setRedirect(true);
  };

  const deleteExperience = (id) => {
    dispatch(deleteExperienceAsync(id));
    setRedirect(true);
  };

  return (
    <ExperienceForm
      type="edit"
      experience={experience}
      dispatchFunction={editExperience}
      deleteExperience={deleteExperience}
    />
  );
};

export default EditExperience;
