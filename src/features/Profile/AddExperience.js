import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { addExperienceAsync } from "./profileSlice";
import { showSnackbar } from "../../components/ui/uiSlice";

import ExperienceForm from "./ExperienceForm";

const AddExperience = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { isLoading, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const addExperience = (newExperience) => {
    dispatch(addExperienceAsync(newExperience));
    setFormSubmitted(true);
  };

  if (formSubmitted && !isLoading) {
    if (!error) {
      dispatch(
        showSnackbar({
          message: "New Experience added successfully!",
          type: "success",
        })
      );
      return <Redirect to="/" />;
    }
  }

  return <ExperienceForm dispatchFunction={addExperience} type="add" />;
};

export default AddExperience;
