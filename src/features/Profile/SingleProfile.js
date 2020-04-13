import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { getProfileByUserIdAsync } from "./profileSlice";

const useStyle = makeStyles({
  profile: {
    border: "1px solid black",
  },
  bioAndSkills: {
    border: "1px solid black",
  },
});

const SingleProfile = ({
  match: {
    params: { id: userId },
  },
}) => {
  const classes = useStyle();
  const { isLoading, profile } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileByUserIdAsync(userId));
  }, [dispatch, userId]);

  console.log("profile", profile);

  if (isLoading) return <div>Loading...</div>;
  if (profile === null) return null;

  const { user, company, social, status, bio, skills } = profile;
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
    </div>
  );
};

export default SingleProfile;
