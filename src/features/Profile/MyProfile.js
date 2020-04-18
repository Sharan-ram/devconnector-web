import React, { useState, useReducer } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { makeStyles } from "@material-ui/styles";

import { updateProfileAsync } from "./profileSlice";

import useMyProfile from "../../hooks/useMyProfile";
import { HeaderText } from "../../components/ui";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridGap: "1.5em",
    width: "80%",
    margin: "0 auto 2.5em",
  },
  select: {
    width: "100%",
  },
  textArea: {
    width: "100%",
  },
  socialMediaLinks: {
    display: "grid",
    gridGap: "1.5em",
  },
  socialMediaButton: {
    background: theme.palette.primary.lightColor,
  },
  links: {
    display: "grid",
    gridTemplateColumns: "1fr 9fr",
    alignItems: "center",
  },
  logo: {
    justifySelf: "center",
  },
}));

const getInitialState = (profile) => {
  if (typeof profile === "string") {
    return {
      status: "",
      company: "",
      website: "",
      location: "",
      skills: "",
      githubusername: "",
      bio: "",
      youtube: "",
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
    };
  }
  const {
    status = "",
    company = "",
    website = "",
    location = "",
    skills = "",
    githubusername = "",
    bio = "",
    social = {},
  } = profile;
  const {
    youtube = "",
    twitter = "",
    facebook = "",
    instagram = "",
    linkedin = "",
  } = social;
  return {
    status,
    company,
    website,
    location,
    skills: skills.join(","),
    githubusername,
    bio,
    youtube,
    twitter,
    facebook,
    instagram,
    linkedin,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "STATUS":
    case "COMPANY":
    case "WEBSITE":
    case "LOCATION":
    case "SKILLS":
    case "GITHUBUSERNAME":
    case "BIO":
    case "YOUTUBE":
    case "TWITTER":
    case "FACEBOOK":
    case "INSTAGRAM":
    case "LINKEDIN":
      return Object.assign({}, state, {
        [action.type.toLowerCase()]: action.payload,
      });
    default:
      return state;
  }
};

const Form = ({ profile, updateProfile }) => {
  const classes = useStyle();
  const [showSocialMediaLinks, toggleSocialMediaLinks] = useState(false);

  const [
    {
      status,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      youtube,
      twitter,
      facebook,
      instagram,
      linkedin,
    },
    dispatch,
  ] = useReducer(reducer, getInitialState(profile));

  const callUpdateProfile = () => {
    const profile = {
      status,
      company,
      website,
      location,
      skills: skills.split(","),
      githubusername,
      bio,
      social: {
        youtube,
        twitter,
        facebook,
        instagram,
        linkedin,
      },
    };
    updateProfile(profile);
  };

  return (
    <div className={classes.container}>
      <HeaderText text="Let's get some information to make your profile stand out" />
      <small>* = required field</small>
      <div>
        <FormControl variant="outlined" required className={classes.select}>
          <InputLabel>Select Professional Status</InputLabel>
          <Select
            value={status}
            onChange={(e) =>
              dispatch({ type: "STATUS", payload: e.target.value })
            }
          >
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Junior Developer">Junior Developer</MenuItem>
            <MenuItem value="Senior Developer">Senior Developer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Student or Learning">Student or Learning</MenuItem>
            <MenuItem value="Instructor or Teacher">
              Instructor or Teacher
            </MenuItem>
            <MenuItem value="Intern">Intern</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <FormHelperText>
            Give us an idea of where you are at in your career
          </FormHelperText>
        </FormControl>
      </div>
      <div>
        <TextField
          label="Company"
          value={company}
          onChange={(e) =>
            dispatch({ type: "COMPANY", payload: e.target.value })
          }
          variant="outlined"
          fullWidth
          helperText="Could be your own company or one you work for"
        />
      </div>
      <div>
        <TextField
          label="Website"
          value={website}
          onChange={(e) =>
            dispatch({ type: "WEBSITE", payload: e.target.value })
          }
          variant="outlined"
          fullWidth
          helperText="Could be your own or company website"
        />
      </div>
      <div>
        <TextField
          label="Location"
          value={location}
          onChange={(e) =>
            dispatch({ type: "LOCATION", payload: e.target.value })
          }
          variant="outlined"
          fullWidth
          helperText="City and State suggested(eg Boston, MA)"
        />
      </div>
      <div>
        <TextField
          label="Skills"
          value={skills}
          onChange={(e) =>
            dispatch({ type: "SKILLS", payload: e.target.value })
          }
          variant="outlined"
          fullWidth
          helperText="Please use comma separated values(eg. HTML, CSS, JAVASCRIPT)"
          required
        />
      </div>
      <div>
        <TextField
          label="Github Username"
          value={githubusername}
          onChange={(e) =>
            dispatch({ type: "GITHUBUSERNAME", payload: e.target.value })
          }
          variant="outlined"
          fullWidth
          helperText="If you want your latest repos and a Github link, include your username"
        />
      </div>
      <div>
        <TextareaAutosize
          rowsMin={5}
          value={bio}
          onChange={(e) => dispatch({ type: "BIO", payload: e.target.value })}
          placeholder="Tell us a little about yourself"
          className={classes.textArea}
        />
      </div>
      <div>
        <Button
          vatiant="contained"
          className={classes.socialMediaButton}
          onClick={() => toggleSocialMediaLinks(!showSocialMediaLinks)}
        >
          Add Social Network Links
        </Button>
      </div>
      {showSocialMediaLinks && (
        <div className={classes.socialMediaLinks}>
          <div className={classes.links}>
            <div className={classes.logo}>
              <YouTubeIcon style={{ fill: "#c4302b", width: "1.5em" }} />
            </div>
            <div>
              <TextField
                label="Youtube"
                value={youtube}
                onChange={(e) =>
                  dispatch({ type: "YOUTUBE", payload: e.target.value })
                }
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className={classes.links}>
            <div className={classes.logo}>
              <TwitterIcon style={{ fill: "#00acee", width: "1.5em" }} />
            </div>
            <div>
              <TextField
                label="Twitter"
                value={twitter}
                onChange={(e) =>
                  dispatch({ type: "TWITTER", payload: e.target.value })
                }
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className={classes.links}>
            <div className={classes.logo}>
              <FacebookIcon style={{ fill: "#3b5998", width: "1.5em" }} />
            </div>
            <div>
              <TextField
                label="Facebook"
                value={facebook}
                onChange={(e) =>
                  dispatch({ type: "FACEBOOK", payload: e.target.value })
                }
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className={classes.links}>
            <div className={classes.logo}>
              <InstagramIcon style={{ width: "1.5em" }} />
            </div>
            <div>
              <TextField
                label="Instagram"
                value={instagram}
                onChange={(e) =>
                  dispatch({ type: "INSTAGRAM", payload: e.target.value })
                }
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className={classes.links}>
            <div className={classes.logo}>
              <LinkedInIcon style={{ fill: "#0e76a8", width: "1.5em" }} />
            </div>
            <div>
              <TextField
                label="LinkedIn"
                value={linkedin}
                onChange={(e) =>
                  dispatch({ type: "LINKEDIN", payload: e.target.value })
                }
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          onClick={callUpdateProfile}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

const MyProfileComponent = ({
  history: {
    location: { state },
  },
}) => {
  const [_, profile] = useMyProfile(state);
  const dispatch = useDispatch();

  const updateProfile = (profile) => {
    dispatch(updateProfileAsync(profile));
  };

  if (profile === null) return null;

  return <Form profile={profile} updateProfile={updateProfile} />;
};

const MyProfile = withRouter(MyProfileComponent);

export default MyProfile;
