import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { getAllProfilesAsync } from "./profileSlice";

const useStyle = makeStyles({
  profile: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr",
    border: "1px solid black",
  },
});

const UserProfiles = () => {
  const [profileId, setProfile] = useState();
  const { isLoading, userProfiles } = useSelector((state) => state.profile);

  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProfilesAsync());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (userProfiles === null) return null;
  if (profileId) return <Redirect to={`/users/profiles/${profileId}`} />;

  return (
    <div>
      <h3>Browse and connect with developers</h3>
      {userProfiles.length !== 0 ? (
        userProfiles.map((profile) => {
          const {
            _id: profileId,
            user,
            company,
            location,
            status,
            skills,
          } = profile;
          const { name, avatar, _id: userId } = user;
          return (
            <div key={profileId} className={classes.profile}>
              <div>Avatar comes here</div>
              <div>
                <Typography component="h3">{name}</Typography>
                <Typography component="p">{`${status} at ${company}`}</Typography>
                <Typography component="span">
                  {location || "No location mentioned"}
                </Typography>
                <div>
                  <Button onClick={() => setProfile(profileId)}>
                    View Profile
                  </Button>
                </div>
              </div>
              <div>
                {skills.map((skill, index) => (
                  <Typography key={index} component="p">
                    {skill}
                  </Typography>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div>No Profiles found</div>
      )}
    </div>
  );
};

export default UserProfiles;
