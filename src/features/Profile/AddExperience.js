import React from "react";
import { useDispatch } from "react-redux";

import { addExperienceAsync } from "./profileSlice";

import ExperienceForm from "./ExperienceForm";

const AddExperience = () => {
  const dispatch = useDispatch();

  const addExperience = newExperience => {
    dispatch(addExperienceAsync(newExperience));
  };

  return <ExperienceForm dispatchFunction={addExperience} type="add" />;
};

export default AddExperience;
