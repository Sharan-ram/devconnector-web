import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { getAllProfilesAsync } from "./profileSlice";

import { Loader, HeaderText } from "../../components/ui";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridGap: "1.5em",
    width: "80%",
    margin: "0 auto 2.5em",
  },
  profile: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr",
    gridGap: "2em",
    background: theme.palette.primary.lightColor,
    border: "#ccc solid 1px",
    padding: "1.5em",
    textAlign: "center",
  },
  imageWrapper: {
    alignSelf: "center",
  },
  image: {
    borderRadius: "50%",
    width: "100%",
  },
  details: {
    alignSelf: "center",
    justifySelf: "center",
  },
  name: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  skills: {
    alignSelf: "center",
    color: theme.palette.primary.main,
    textAlign: "start",
  },
}));

const UserProfiles = () => {
  const { isLoading, userProfiles } = useSelector((state) => state.profile);

  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userProfiles === null) {
      dispatch(getAllProfilesAsync());
    }
  }, [dispatch, userProfiles]);

  if (isLoading) return <Loader />;
  if (userProfiles === null) return null;

  return (
    <div className={classes.container}>
      <HeaderText text="Browse and connect with developers" />
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
              <div className={classes.imageWrapper}>
                <img src={avatar} className={classes.image} />
              </div>
              <div className={classes.details}>
                <Typography className={classes.name} component="h2">
                  {name}
                </Typography>
                <Typography component="span">{`${status} at ${company}`}</Typography>
                <p>{location || ""}</p>
                <div>
                  <Button
                    onClick={() =>
                      history.push({
                        pathname: `/users/profiles/${userId}`,
                        state: {
                          userId,
                          profile,
                        },
                      })
                    }
                    variant="contained"
                    color="primary"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
              <div className={classes.skills}>
                {skills.map((skill, index) => (
                  <Typography key={index} component="p">
                    &#10004;{skill}
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
