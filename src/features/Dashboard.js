import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import useMyProfile from "../hooks/useMyProfile";
import moment from "moment";

const Dashboard = () => {
  const [isLoading, profile] = useMyProfile();
  const [educationId, setEditEducation] = useState();

  const history = useHistory();

  if (isLoading) return <div>Loading Profile...</div>;

  if (profile === null) return null;

  if (educationId)
    return <Redirect to={`/profile/me/edit-education/${educationId}`} />;

  const { experience, education, user } = profile;

  const sortByFromDate = (arr) => {
    return arr
      .map((obj) => {
        const { from, to } = obj;
        return {
          ...obj,
          from: moment(from),
          to: to && moment(to),
        };
      })
      .sort((a, b) => b.from.diff(a.from));
  };

  const sortedExperience = sortByFromDate(experience);

  const sortedEducation = sortByFromDate(education);

  return (
    <div>
      <h3>Welcome {user.name}</h3>
      <div>
        <Button
          onClick={() =>
            history.push({ pathname: "/profile/me", state: { profile } })
          }
        >
          Edit Profile
        </Button>
        <Button onClick={() => history.push("/profile/me/add-experience")}>
          Add Experience
        </Button>
        <Button onClick={() => history.push("/profile/me/add-education")}>
          Add Education
        </Button>
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
                      <Button
                        onClick={() =>
                          history.push({
                            pathname: `/profile/me/edit-experience/${_id}`,
                            state: {
                              experienceId: _id,
                              profile,
                            },
                          })
                        }
                      >
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
      <div>
        <h4>Education Credentials</h4>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>School</TableCell>
                <TableCell>Degree</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedEducation.map((ed) => {
                const { _id, school, degree, from, to, current } = ed;
                const toDate = to && to.format("DD-MM-YYYY");
                return (
                  <TableRow key={_id}>
                    <TableCell>{school}</TableCell>
                    <TableCell>{degree}</TableCell>
                    <TableCell>{from.format("DD-MM-YYYY")}</TableCell>
                    <TableCell>
                      {current === true ? "Present" : toDate}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => setEditEducation(_id)}>
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
