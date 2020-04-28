import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";
import moment from "moment";

import Button from "@material-ui/core/Button";
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
  backToProfileButton: {
    background: theme.palette.primary.lightColor,
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
    border: "1px solid #ccc",
    background: theme.palette.primary.lightColor,
    textAlign: "center",
    padding: "2em",
  },
  titleHeader: {
    color: theme.palette.primary.main,
  },
  skills: {
    display: "grid",
    gridAutoFlow: "column",
    gridGap: "1em",
    justifyContent: "center",
  },
  divider: {
    height: "1px",
    background: "#ccc",
    margin: "1.5em 0",
  },
  experienceAndEducation: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1em",
  },
  experienceWrapper: {
    padding: "2em",
    border: "1px solid #ccc",
  },
  educationWrapper: {
    padding: "2em",
    border: "1px solid #ccc",
  },
  githubRepos: {
    display: "grid",
    gridAutoFlow: "row",
    gridGap: "1em",
  },
  repo: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    border: "1px solid #ccc",
    padding: "1em",
  },
  githubName: {
    color: theme.palette.primary.main,
    margin: "0 0 1em",
    padding: 0,
  },
  repoDetails: {
    justifySelf: "end",
    display: "grid",
    gridAutoFlow: "row",
    gridGap: "0.3em",
    width: "30%",
    textAlign: "center",
  },
  stars: {
    background: theme.palette.primary.main,
    color: "#fff",
  },
  watchers: {
    background: theme.palette.primary.darkColor,
    color: "#fff",
  },
  forks: {
    background: theme.palette.primary.lightColor,
    border: "1px solid #ccc",
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
  const history = useHistory();
  const [isProfileLoading, profile] = useProfileByUserId(state, userId);
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
      <div>
        <Button
          variant="contained"
          className={classes.backToProfileButton}
          onClick={() => history.push("/users/profiles/all")}
        >
          Back To Profiles
        </Button>
      </div>
      <div className={classes.profile}>
        <div>
          <img src={avatar} className={classes.avatar} alt="avatar" />
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
          <h2 className={classes.titleHeader}>{`${name}'s Bio`}</h2>
          <Typography component="p">{bio}</Typography>
        </div>
        <div className={classes.divider} />
        <div>
          <h2 className={classes.titleHeader}>Skill Set</h2>
          <div className={classes.skills}>
            {skills.map((skill, index) => (
              <span key={index}>&#10004;{skill}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.experienceAndEducation}>
        <div className={classes.experienceWrapper}>
          <h2 className={classes.titleHeader}>Experience</h2>
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
                <h3>{company}</h3>
                <Typography component="span">{`${moment(from).format(
                  "DD-MM-YYYY"
                )} to ${
                  to ? moment(to).format("DD-MM-YYYY") : "NA"
                }`}</Typography>
                <div>
                  <p>
                    <strong>Position:</strong> {title}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Location:</strong> {location ? location : "NA"}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Description:</strong>{" "}
                    {description ? description : "NA"}
                  </p>
                </div>
                <div className={classes.divider} />
              </div>
            );
          })}
        </div>
        <div className={classes.educationWrapper}>
          <h2 className={classes.titleHeader}>Education</h2>
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
                <h3>{school}</h3>
                <Typography component="span">{`${moment(from).format(
                  "DD-MM-YYYY"
                )} to ${
                  to ? moment(to).format("DD-MM-YYYY") : "NA"
                }`}</Typography>
                <div>
                  <p>
                    <strong>Degree:</strong> {degree}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Field of Study:</strong>{" "}
                    {fieldofstudy ? fieldofstudy : "NA"}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Description:</strong>{" "}
                    {description ? description : "NA"}
                  </p>
                </div>
                <div className={classes.divider} />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className={classes.titleHeader}>Github repos</h2>
        {isGithubReposLoading && <div>Loading Github repos</div>}
        {githubRepos !== null && (
          <div className={classes.githubRepos}>
            {githubRepos.map((repo) => {
              const {
                id,
                name,
                description,
                language,
                html_url,
                stargazers_count: stars,
                forks,
                watchers,
              } = repo;
              return (
                <div className={classes.repo} key={id}>
                  <div>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={{ pathname: html_url }}
                      target="_blank"
                    >
                      <h4 className={classes.githubName}>{name}</h4>
                    </Link>
                    <Typography component="p">{description}</Typography>
                    <Typography component="span">
                      <strong>{language}</strong>
                    </Typography>
                  </div>
                  <div className={classes.repoDetails}>
                    <div className={classes.stars}>Stars: {stars}</div>
                    <div className={classes.watchers}>Watchers: {watchers}</div>
                    <div className={classes.forks}>Forks: {forks}</div>
                  </div>
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
