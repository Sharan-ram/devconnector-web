import React from "react";
import { useDispatch } from "react-redux";

import { addEducationAsync } from "./profileSlice";

import EducationForm from "./EducationForm";

const AddEducation = () => {
  const dispatch = useDispatch();

  const addEducation = (newEducation) => {
    dispatch(addEducationAsync(newEducation));
  };

  return <EducationForm dispatchFunction={addEducation} type="add" />;
};

export default AddEducation;
