import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import useMyProfile from "../hooks/useMyProfile";
import moment from "moment";

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
  const [experienceId, setEditExperience] = useState();

  const dispatch = useDispatch();

  if (isLoading) return <div>Loading Profile...</div>;

  if (profile === null) return null;

  if (redirectToEditProfile) return <Redirect to="/profile/me" />;

  if (redirectToAddExperience)
    return <Redirect to="/profile/me/add-experience" />;

  if (experienceId)
    return <Redirect to={`/profile/me/edit-experience/${experienceId}`} />;

  const { experience, education, user } = profile;

  const sortedExperience = experience
    .map((exp) => {
      const { from, to } = exp;
      return {
        ...exp,
        from: moment(from),
        to: to && moment(to),
      };
    })
    .sort((a, b) => b.from.diff(a.from));

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
      <div>
        <h4>Experience Credentials</h4>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedExperience.map((exp) => {
                const { _id, company, title, from, to, current } = exp;
                const toDate = to && to.format("DD-MM-YYYY");
                return (
                  <TableRow key={_id}>
                    <TableCell>{company}</TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell>{from.format("DD-MM-YYYY")}</TableCell>
                    <TableCell>
                      {current === true ? "Present" : toDate}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => setEditExperience(_id)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Dashboard;
