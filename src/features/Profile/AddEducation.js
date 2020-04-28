import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addEducationAsync } from "./profileSlice";

import EducationForm from "./EducationForm";
import { showSnackbar } from "../../components/ui/uiSlice";

const AddEducation = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { isLoading, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const addEducation = (newEducation) => {
    dispatch(addEducationAsync(newEducation));
    setFormSubmitted(true);
  };

  if (formSubmitted && !isLoading) {
    if (!error) {
      dispatch(
        showSnackbar({
          message: "New Education added successfully!",
          type: "success",
        })
      );
      return <Redirect to="/" />;
    }
  }

  return <EducationForm dispatchFunction={addEducation} type="add" />;
};

export default AddEducation;
