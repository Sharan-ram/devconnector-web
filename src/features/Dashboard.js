import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { DatePicker } from "@material-ui/pickers";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import useMyProfile from "../hooks/useMyProfile";
import { addExperienceAsync } from "./Profile/profileSlice";

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

const ExperienceForm = ({ closeDialog, addNewExperience }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [fromDate, setFromDate] = useState(moment());
  const [toDate, setToDate] = useState();
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");

  const addExperience = () => {
    addNewExperience({
      title,
      company,
      location,
      from: fromDate,
      to: toDate,
      current,
      description
    });
    closeDialog();
  };

  return (
    <Dialog open={true} onClose={closeDialog}>
      <DialogTitle>
        <DialogTitle>Add Education</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="Job Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <TextField
              label="Company"
              value={company}
              onChange={e => setCompany(e.target.value)}
              required
            />
          </div>
          <div>
            <TextField
              label="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <div>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={date => setFromDate(date)}
              format="DD/MM/YYYY"
              variant="inline"
              autoOk
              disableFuture
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={current}
                  onChange={e => setCurrent(e.target.checked)}
                />
              }
              label="Current"
            />
          </div>
          <div>
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={date => setToDate(date)}
              format="DD/MM/YYYY"
              disabled={current}
              disableFuture
              autoOk
              variant="inline"
            />
          </div>
          <div>
            <TextareaAutosize
              rowsMin={5}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Job Description"
            />
          </div>
        </DialogContent>
      </DialogTitle>
      <DialogActions>
        <Button onClick={addExperience}>Submit</Button>
        <Button onClick={closeDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

const Dashboard = () => {
  const [isLoading, profile] = useMyProfile();
  const [showExperienceForm, toggleExperienceForm] = useState(false);
  const [showEducationForm, toggleEducationForm] = useState(false);
  const [redirectToEditProfile, setRedirect] = useState(false);

  const dispatch = useDispatch();

  if (isLoading) return <div>Loading Profile...</div>;

  if (profile === null) return null;

  if (redirectToEditProfile) return <Redirect to="/profile/me" />;

  const addNewExperience = experience => {
    dispatch(addExperienceAsync(experience));
  };

  const { experience, education, user } = profile;

  return (
    <div>
      <h3>Welcome {user.name}</h3>
      <div>
        <Button onClick={() => setRedirect(true)}>Edit Profile</Button>
        <Button onClick={() => toggleExperienceForm(!showExperienceForm)}>
          Add Experience
        </Button>
        {showExperienceForm && (
          <ExperienceForm
            closeDialog={() => toggleExperienceForm(false)}
            addNewExperience={addNewExperience}
          />
        )}
        <Button onClick={() => toggleEducationForm(!showEducationForm)}>
          Add Education
        </Button>
        {showEducationForm && <EducationForm />}
      </div>
    </div>
  );
};

export default Dashboard;
