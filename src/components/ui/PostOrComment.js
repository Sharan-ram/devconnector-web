import React from "react";
import moment from "moment";
import cx from "classnames";
import { Link, useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Like from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  post: {
    display: "grid",
    border: "1px solid #ccc",
    gridTemplateColumns: "1fr 4fr",
    gridGap: "2em",
    padding: "1em",
  },
  nameAndAvatarWrapper: {
    display: "grid",
    gridAutoFlow: "row",
    gridGap: "0.5em",
    textAlign: "center",
    alignSelf: "center",
  },
  link: {
    textDecoration: "none",
  },
  image: {
    borderRadius: "50%",
    width: "100px",
  },
  detailsWrapper: {
    display: "grid",
    alignContent: "center",
  },
  name: {
    margin: 0,
    padding: 0,
    color: theme.palette.primary.main,
  },
  dateWrapper: {
    margin: "1em 0",
  },
  date: {
    fontSize: "0.8em",
    color: "#aaa",
  },
  buttonsWrapper: {
    display: "grid",
    gridAutoFlow: "column",
    gridGap: "0.5em",
    alignContent: "center",
    justifyContent: "start",
  },
  likeButtonWrapper: {
    display: "grid",
    gridAutoFlow: "column",
    gridGap: "0.2em",
    alignContent: "center",
  },
  likeButton: {
    "&:hover": {
      cursor: "pointer",
      fill: "#9bacd1",
    },
  },
  like: {
    fill: "#3b5998",
  },
  likeText: {
    alignSelf: "center",
  },
  discussionButton: {
    background: theme.palette.primary.main,
    color: "#fff",
  },
  deletePost: {
    background: theme.palette.primary.danger,
    color: "#fff",
  },
}));

const PostOrComment = ({
  _id,
  link,
  name,
  text,
  date,
  avatar,
  likes,
  variant,
  type,
  postDetails: {
    comments,
    hasUserLiked,
    handleLikeOrUnlike,
    deleteButtonClick,
    getLikeCountText,
    historyPushObject,
    isPostOwner,
  },
}) => {
  const classes = useStyle();
  const history = useHistory();
  return (
    <div className={classes.post}>
      <div className={classes.nameAndAvatarWrapper}>
        <Link className={classes.link} to={link}>
          <div>
            <img src={avatar} className={classes.image} />
          </div>
          <div>
            <h4 className={classes.name}>{name}</h4>
          </div>
        </Link>
      </div>
      <div className={classes.detailsWrapper}>
        <div>
          <Typography component="p">{text}</Typography>
        </div>
        <div className={classes.dateWrapper}>
          <Typography className={classes.date} component="span">
            Posted on {moment(date).format("DD-MM-YYYY")}
          </Typography>
        </div>
        {variant === "post" && type === "edit" && (
          <div className={classes.buttonsWrapper}>
            <div className={classes.likeButtonWrapper}>
              <div>
                <Like
                  className={cx(
                    classes.likeButton,
                    hasUserLiked && classes.like
                  )}
                  onClick={() => handleLikeOrUnlike(_id, hasUserLiked)}
                />
              </div>
              <div className={classes.likeText}>
                <small>
                  {likes.length !== 0
                    ? getLikeCountText(hasUserLiked, likes.length)
                    : ""}
                </small>
              </div>
            </div>
            {isPostOwner && (
              <div>
                <Button
                  onClick={deleteButtonClick}
                  variant="contained"
                  className={classes.deletePost}
                >
                  Delete Post
                </Button>
              </div>
            )}
          </div>
        )}
        {variant === "post" && type === "show" && (
          <div>
            <Button
              onClick={() => history.push(historyPushObject)}
              className={classes.discussionButton}
              variant="contained"
            >
              Discussion
              {comments.length === 0 ? "" : `(${comments.length})`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostOrComment;
