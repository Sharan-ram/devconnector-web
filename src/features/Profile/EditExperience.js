import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import useMyProfile from "../../hooks/useMyProfile";
import { editExperienceAsync, deleteExperienceAsync } from "./profileSlice";
import ExperienceForm from "./ExperienceForm";

import { Loader } from "../../components/ui";
import { showSnackbar } from "../../components/ui/uiSlice";

const EditExperience = ({
  history: {
    location: { state },
  },
}) => {
  const [isProfileLoading, profile] = useMyProfile(state);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [experienceDeleted, setExperienceDeleted] = useState(false);
  const { error, isLoading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  if (!state) return <Redirect to="/" />;

  if (isProfileLoading) return <Loader />;

  if (profile === null) return null;

  const { experienceId } = state;
  const experience = profile.experience.find((exp) => exp._id === experienceId);
  /* When url is entered directly with wrong experience id without navigating
    from dashboard
  */
  if (!experience) return <Redirect to="/" />;

  if (formSubmitted && !isLoading) {
    if (!error) {
      dispatch(
        showSnackbar({
          message: "Experience edited successfully!",
          type: "success",
        })
      );
      return <Redirect to="/" />;
    }
  }

  if (experienceDeleted && !isLoading) {
    if (!error) {
      dispatch(
        showSnackbar({
          message: "Experience deleted successfully!",
          type: "success",
        })
      );
      return <Redirect to="/" />;
    }
  }

  const editExperience = (experience) => {
    dispatch(editExperienceAsync(experience));
    setFormSubmitted(true);
  };

  const deleteExperience = (id) => {
    dispatch(deleteExperienceAsync(id));
    setExperienceDeleted(true);
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
