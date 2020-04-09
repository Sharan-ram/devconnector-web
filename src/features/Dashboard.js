import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import useMyProfile from "../hooks/useMyProfile";

const EducationForm = () => {
  return (
    <Dialog open={true}>
      <DialogTitle>
        <DialogTitle>Add Experience</DialogTitle>
        <DialogContent>Details here</DialogContent>
      </DialogTitle>
      <DialogActions>Buttons will come here</DialogActions>
    </Dialog>
  );
};

const Dashboard = () => {
  const [isLoading, profile] = useMyProfile();
  const [redirectToEditProfile, toggleEditProfile] = useState(false);
  const [redirectToAddExperience, toggleAddExperience] = useState(false);

  const dispatch = useDispatch();

  if (isLoading) return <div>Loading Profile...</div>;

  if (profile === null) return null;

  if (redirectToEditProfile) return <Redirect to="/profile/me" />;
  if (redirectToAddExperience)
    return <Redirect to="/profile/me/add-experience" />;

  const { experience, education, user } = profile;

  return (
    <div>
      <h3>Welcome {user.name}</h3>
      <div>
        <Button onClick={() => toggleEditProfile(true)}>Edit Profile</Button>
        <Button onClick={() => toggleAddExperience(true)}>
          Add Experience
        </Button>
        <Button>Add Education</Button>
      </div>
    </div>
  );
};

export default Dashboard;
