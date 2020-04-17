import React, { useState, useReducer } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { updateProfileAsync } from "./profileSlice";

import useMyProfile from "../../hooks/useMyProfile";

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
    <div>
      <div>
        <FormControl required>
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
          helperText="If you want your latest repos and a Github link, include your username"
        />
      </div>
      <div>
        <TextareaAutosize
          rowsMin={5}
          value={bio}
          onChange={(e) => dispatch({ type: "BIO", payload: e.target.value })}
          placeholder="Tell us a little about yourself"
        />
      </div>
      {!showSocialMediaLinks ? (
        <div>
          <Button onClick={() => toggleSocialMediaLinks(!showSocialMediaLinks)}>
            Add Social Network Links
          </Button>{" "}
          Optional
        </div>
      ) : (
        <div>
          <div>
            <TextField
              label="Youtube"
              value={youtube}
              onChange={(e) =>
                dispatch({ type: "YOUTUBE", payload: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              label="Twitter"
              value={twitter}
              onChange={(e) =>
                dispatch({ type: "TWITTER", payload: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              label="Facebook"
              value={facebook}
              onChange={(e) =>
                dispatch({ type: "FACEBOOK", payload: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              label="Instagram"
              value={instagram}
              onChange={(e) =>
                dispatch({ type: "INSTAGRAM", payload: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              label="LinkedIn"
              value={linkedin}
              onChange={(e) =>
                dispatch({ type: "LINKEDIN", payload: e.target.value })
              }
            />
          </div>
        </div>
      )}

      <Button onClick={callUpdateProfile}>Submit</Button>
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
