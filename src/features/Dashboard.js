import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import useMyProfile from "../hooks/useMyProfile";

const ExperienceForm = () => {
  return (
    <Dialog open={true}>
      <DialogTitle>
        <DialogTitle>Add Experience</DialogTitle>
        <DialogContent>
          <DialogContentText>All details will come here</DialogContentText>
        </DialogContent>
      </DialogTitle>
      <DialogActions>Buttons will come here</DialogActions>
    </Dialog>
  );
};

const EducationForm = () => {
  return (
    <Dialog open={true}>
      <DialogTitle>
        <DialogTitle>Add Education</DialogTitle>
        <DialogContent>
          <DialogContentText>All details will come here</DialogContentText>
        </DialogContent>
      </DialogTitle>
      <DialogActions>Buttons will come here</DialogActions>
    </Dialog>
  );
};

const Dashboard = () => {
  const [isLoading, profile] = useMyProfile();
  const [showExperienceForm, toggleExperienceForm] = useState(false);
  const [showEducationForm, toggleEducationForm] = useState(false);
  const [redirectToEditProfile, setRedirect] = useState(false);

  if (isLoading) return <div>Loading Profile...</div>;

  if (profile === null) return null;

  if (redirectToEditProfile) return <Redirect to="/profile/me" />;

  const { experience, education, user } = profile;

  return (
    <div>
      <h3>Welcome {user.name}</h3>
      <div>
        <Button onClick={() => setRedirect(true)}>Edit Profile</Button>
        <Button onClick={() => toggleExperienceForm(!showExperienceForm)}>
          Add Experience
        </Button>
        {showExperienceForm && <ExperienceForm />}
        <Button onClick={() => toggleEducationForm(!showEducationForm)}>
          Add Education
        </Button>
        {showEducationForm && <EducationForm />}
      </div>
    </div>
  );
};

export default Dashboard;
