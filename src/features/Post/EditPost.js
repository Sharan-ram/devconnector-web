import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";

import { getPostByIdAsync, addCommentAsync } from "./postSlice";
import useMyProfile from "../../hooks/useMyProfile";

const useStyle = makeStyles({
  post: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
  },
});

const EditPost = ({
  match: {
    params: { id },
  },
}) => {
  const [isProfileLoading, profile] = useMyProfile();
  const classes = useStyle();

  const [comment, setComment] = useState("");
  const { isLoading, post } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostByIdAsync(id));
  }, [dispatch, id]);

  if (isLoading || isProfileLoading) return <div>Loading...</div>;
  if (post === null || profile === null) return null;

  const { _id, text, name, date } = post;

  const addComment = () => {
    dispatch(
      addCommentAsync({ postId: _id, text: comment, user: profile.user._id })
    );
  };

  return (
    <div>
      <div className={classes.post}>
        <div>{name}</div>
        <div>
          <Typography component="p">{text}</Typography>
          <Typography component="span">
            Posted on {moment(date).format("DD-MM-YYYY")}
          </Typography>
        </div>
      </div>
      <div>Leave a comment</div>
      <TextareaAutosize
        rowsMin={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comment on the post"
      />
      <Button disabled={comment === ""} onClick={addComment}>
        Submit
      </Button>
    </div>
  );
};

export default EditPost;
