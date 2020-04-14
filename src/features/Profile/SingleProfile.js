import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { getProfileByUserIdAsync, getGithubReposAsync } from "./profileSlice";

const useStyle = makeStyles({
  profile: {
    border: "1px solid black",
  },
  bioAndSkills: {
    border: "1px solid black",
  },
  experienceAndEducation: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    border: "1px solid black",
  },
  experience: {
    border: "1px solid black",
  },
  githubRepos: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  repo: {
    border: "1px solid black",
  },
});

const SingleProfile = ({
  match: {
    params: { id: userId },
  },
}) => {
  const classes = useStyle();
  const { isLoading, profile, githubRepos, isGithubReposLoading } = useSelector(
    (state) => state.profile
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileByUserIdAsync(userId));
  }, [dispatch, userId]);

  const { githubusername } = profile || {};
  useEffect(() => {
    if (githubusername) {
      dispatch(getGithubReposAsync(githubusername));
    }
  }, [dispatch, githubusername]);

  console.log("profile", profile);
  console.log("githubRepos", githubRepos);

  if (isLoading) return <div>Loading...</div>;
  if (profile === null) return null;

  const {
    user,
    company,
    social,
    status,
    bio,
    skills,
    experience,
    education,
  } = profile;
  const { name } = user;
  return (
    <div>
      <div className={classes.profile}>
        <div>Avatar comes here</div>
        <div>{name}</div>
        <div>{`${status} at ${company}`}</div>
        <div>Social media links here</div>
      </div>
      <div className={classes.bioAndSkills}>
        <div>
          <h3>{`${name}s Bio`}</h3>
          <Typography component="p">{bio}</Typography>
        </div>
        <div>
          <h3>Skill Set</h3>
          <div>
            {skills.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.experienceAndEducation}>
        <div className={classes.experience}>
          <h3>Experience</h3>
          {experience.map((experience) => {
            const {
              _id,
              company,
              title,
              location,
              from,
              to,
              description,
            } = experience;
            return (
              <div key={_id}>
                <h4>{company}</h4>
                <Typography component="span">{`${moment(from).format(
                  "DD-MM-YYYY"
                )} to ${
                  to ? moment(to).format("DD-MM-YYYY") : "NA"
                }`}</Typography>
                <div>
                  <h5>Position:</h5>
                  {title}
                </div>
                <div>
                  <h5>Location:</h5>
                  {location ? location : "NA"}
                </div>
                <div>
                  <h5>Description:</h5>
                  {description ? description : "NA"}
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        <div>
          <h3>Education</h3>
          {education.map((education) => {
            const {
              _id,
              school,
              degree,
              fieldofstudy,
              from,
              to,
              description,
            } = education;
            return (
              <div key={_id}>
                <h4>{school}</h4>
                <Typography component="span">{`${moment(from).format(
                  "DD-MM-YYYY"
                )} to ${
                  to ? moment(to).format("DD-MM-YYYY") : "NA"
                }`}</Typography>
                <div>
                  <h5>Degree:</h5>
                  {degree}
                </div>
                <div>
                  <h5>Field of Study:</h5>
                  {fieldofstudy ? fieldofstudy : "NA"}
                </div>
                <div>
                  <h5>Description:</h5>
                  {description ? description : "NA"}
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3>Github repos</h3>
        {isGithubReposLoading && <div>Loading Github repos</div>}
        {githubRepos !== null && (
          <div className={classes.githubRepos}>
            {githubRepos.map((repo) => {
              const { id, name, description, language, html_url } = repo;
              return (
                <div className={classes.repo} key={id}>
                  <Link to={{ pathname: html_url }} target="_blank">
                    {name}
                  </Link>
                  <Typography component="p">{description}</Typography>
                  <Typography component="span">{language}</Typography>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProfile;
