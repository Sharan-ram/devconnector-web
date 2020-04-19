import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { getGithubReposAsync } from "./profileSlice";
import useProfileByUserId from "../../hooks/useProfileByUserId";

import { Loader } from "../../components/ui";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridGap: "1.5em",
    width: "80%",
    margin: "0 auto 2.5em",
  },
  profile: {
    display: "grid",
    justifyContent: "center",
    background: theme.palette.primary.main,
    padding: "2em",
    color: "#fff",
    textAlign: "center",
  },
  name: {
    fontSize: "2.5em",
    fontWeight: "bold",
    margin: "0.5em 0",
  },
  avatar: {
    borderRadius: "50%",
    width: 250,
  },
  status: {
    fontSize: "1.5em",
    marginBottom: "1em",
  },
  linksWrapper: {
    display: "grid",
    gridAutoFlow: "column",
    gridGap: "1em",
    justifyContent: "center",
  },
  links: {
    fontSize: "2.5em",
    fill: "#fff",
    "&:hover": {
      fill: theme.palette.primary.darkColor,
    },
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
}));

const SingleProfileComponent = ({
  match: {
    params: { id: userId },
  },
  history: {
    location: { state },
  },
}) => {
  const classes = useStyle();
  const [isProfileLoading, profile, error] = useProfileByUserId(state, userId);
  const { githubRepos, isGithubReposLoading } = useSelector(
    (state) => state.profile
  );

  const dispatch = useDispatch();

  const { githubusername } = profile || {};
  useEffect(() => {
    if (githubusername) {
      dispatch(getGithubReposAsync(githubusername));
    }
  }, [dispatch, githubusername]);

  if (isProfileLoading) return <Loader />;
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
  const { name, avatar } = user;
  const {
    instagram = "",
    facebook = "",
    linkedin = "",
    youtube = "",
    twitter = "",
  } = social || {};
  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <div>
          <img src={avatar} className={classes.avatar} />
        </div>
        <div className={classes.name}>{name}</div>
        <div>
          <p className={classes.status}>{`${status} at ${company}`}</p>
        </div>
        <div className={classes.linksWrapper}>
          {facebook && (
            <div>
              <Link to={{ pathname: facebook }} target="_blank">
                <FacebookIcon className={classes.links} />
              </Link>
            </div>
          )}
          {twitter && (
            <div>
              <Link to={{ pathname: twitter }} target="_blank">
                <TwitterIcon className={classes.links} />
              </Link>
            </div>
          )}
          {linkedin && (
            <div>
              <Link to={{ pathname: linkedin }} target="_blank">
                <LinkedInIcon className={classes.links} />
              </Link>
            </div>
          )}
          {youtube && (
            <div>
              <Link to={{ pathname: youtube }} target="_blank">
                <YouTubeIcon className={classes.links} />
              </Link>
            </div>
          )}
          {instagram && (
            <div>
              <Link to={{ pathname: instagram }} target="_blank">
                <InstagramIcon className={classes.links} />
              </Link>
            </div>
          )}
        </div>
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

const SingleProfile = withRouter(SingleProfileComponent);

export default SingleProfile;
