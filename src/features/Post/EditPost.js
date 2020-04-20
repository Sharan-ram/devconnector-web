import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";

import {
  addCommentAsync,
  deleteCommentAsync,
  handleLikeOrUnlikeAsync,
} from "./postSlice";

import useMyProfile from "../../hooks/useMyProfile";
import usePost from "../../hooks/usePost";
import { Loader, PostOrComment } from "../../components/ui";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "80%",
    margin: "0 auto 2.5em",
    display: "grid",
    gridGap: "1.5em",
  },
  backButton: {
    background: theme.palette.primary.main,
    color: "#fff",
  },
  header: {
    background: theme.palette.primary.main,
    color: "#fff",
    paddingLeft: "0.5em",
  },
  textArea: {
    width: "100%",
  },
  submitButton: {
    background: theme.palette.primary.darkColor,
  },
}));

const EditPostComponent = ({
  history: {
    location: { state },
  },
  match: {
    params: { id },
  },
}) => {
  const classes = useStyle();
  const history = useHistory();
  const [isProfileLoading, profile] = useMyProfile(state);
  const [isLoading, post] = usePost(state, id);

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  if (isLoading || isProfileLoading) return <Loader />;
  if (post === null || profile === null) return null;

  const { _id, text, name, avatar, date, comments, user, likes } = post;

  const addComment = () => {
    dispatch(
      addCommentAsync({ postId: _id, text: comment, user: profile.user._id })
    );
  };

  const deleteComment = (id) => {
    dispatch(deleteCommentAsync({ commentId: id, postId: _id }));
  };

  const sortedComments = comments
    .slice()
    .sort((a, b) => moment(b.date).diff(moment(a.date)));

  const handleLikeOrUnlike = (postId, hasUserLiked) => {
    let url;
    if (hasUserLiked) {
      url = `${process.env.REACT_APP_API_URL}/api/posts/${postId}/unlike`;
    } else {
      url = `${process.env.REACT_APP_API_URL}/api/posts/${postId}/like`;
    }
    dispatch(handleLikeOrUnlikeAsync({ url, user: profile.user._id }));
  };

  const hasUserLiked = likes.find((like) => like.user === profile.user._id);

  const getLikeCountText = (hasUserLiked, likeCount) => {
    if (!hasUserLiked) {
      if (likeCount > 1) return `${likeCount} like this`;
      return `${likeCount} likes this`;
    }
    if (likeCount === 1) return "You like this";
    if (likeCount === 2) return "You and one other like this";
    return `You and ${likeCount} others like this`;
  };

  const deletePost = () => {};

  const postDetails = {
    hasUserLiked,
    handleLikeOrUnlike,
    deleteButtonClick: deletePost,
    isPostOwner: post.user === profile.user._id,
    getLikeCountText,
  };

  return (
    <div className={classes.container}>
      <div>
        <Button
          onClick={() => history.push("/posts")}
          variant="contained"
          className={classes.backButton}
        >
          Back to Posts
        </Button>
      </div>
      <PostOrComment
        _id={_id}
        link={`/users/profiles/${user}`}
        name={name}
        text={text}
        date={date}
        avatar={avatar}
        likes={likes}
        variant="post"
        type="edit"
        postDetails={postDetails}
        deleteComment={deleteComment}
      />
      <div className={classes.header}>
        <h3>Leave a comment</h3>
      </div>
      <div>
        <TextareaAutosize
          rowsMin={6}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment on the post"
          className={classes.textArea}
        />
      </div>
      <div>
        <Button
          variant="contained"
          className={classes.submitButton}
          disabled={comment === ""}
          onClick={addComment}
        >
          Submit
        </Button>
      </div>
      {sortedComments.length !== 0 ? (
        sortedComments.map((comment) => {
          const { _id, name, text, date, avatar } = comment;
          return (
            <PostOrComment
              key={_id}
              _id={_id}
              name={name}
              avatar={avatar}
              text={text}
              date={date}
              variant="comment"
              link={`/users/profiles/${user}`}
            />
          );
        })
      ) : (
        <div>There are no comments for this post</div>
      )}
    </div>
  );
};

const EditPost = withRouter(EditPostComponent);

export default EditPost;
