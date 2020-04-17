import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";

import useMyProfile from "../hooks/useMyProfile";
import { HeaderText, FormErrors } from "../components/ui";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "80%",
    margin: "0 auto",
  },
  buttonContainer: {
    display: "grid",
    marginTop: "1em",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "1em",
    width: "50%",
  },
  credentialText: {
    margin: "2em 0 1em",
  },
  error: {
    marginTop: "2em",
  },
}));

const Dashboard = () => {
  const classes = useStyle();
  const [isLoading, profile] = useMyProfile();

  const history = useHistory();

  if (isLoading) return <div>Loading Profile...</div>;

  if (profile === null) return null;

  const getProfileDetails = (profile) => {
    if (typeof profile === "string") {
      return {
        experience: [],
        education: [],
        user: { name: "" },
      };
    }
    const { education, experience, user } = profile;
    return { education, experience, user };
  };
  const { experience, education, user } = getProfileDetails(profile);

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
    <div className={classes.container}>
      <HeaderText text={`Welcome ${user.name}`} />
      <div className={classes.buttonContainer}>
        <Button
          onClick={() =>
            history.push({ pathname: "/profile/me", state: { profile } })
          }
          variant="contained"
          color="primary"
        >
          Edit Profile
        </Button>
        <Button
          onClick={() => history.push("/profile/me/add-experience")}
          variant="contained"
          color="primary"
          disabled={typeof profile === "string"}
        >
          Add Experience
        </Button>
        <Button
          onClick={() => history.push("/profile/me/add-education")}
          variant="contained"
          color="primary"
          disabled={typeof profile === "string"}
        >
          Add Education
        </Button>
      </div>
      <FormErrors
        className={classes.error}
        text={
          typeof profile === "string"
            ? "Click on edit profile to create a profile"
            : null
        }
      />
      <div>
        <h2 className={classes.credentialText}>Experience Credentials</h2>
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
                        variant="contained"
                        color="primary"
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
        <h2 className={classes.credentialText}>Education Credentials</h2>
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
                      <Button
                        onClick={() =>
                          history.push({
                            pathname: `/profile/me/edit-education/${_id}`,
                            state: {
                              educationId: _id,
                              profile,
                            },
                          })
                        }
                        variant="contained"
                        color="primary"
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
    </div>
  );
};

export default Dashboard;
