import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";

import {
  getPostByIdAsync,
  addCommentAsync,
  deleteCommentAsync,
} from "./postSlice";
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

  const { _id, text, name, date, comments } = post;

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
      <div>
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
      {sortedComments.length !== 0 ? (
        sortedComments.map((comment) => {
          const { _id, name, text, date, user } = comment;
          return (
            <div key={_id} className={classes.post}>
              <div>{name}</div>
              <div>
                <Typography component="p">{text}</Typography>
                <Typography component="span">
                  Posted on {moment(date).format("DD-MM-YYYY")}
                </Typography>
                {profile.user._id === user && (
                  <div>
                    <Button onClick={() => deleteComment(_id)}>
                      Delete Comment
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div>There are no comments for this post</div>
      )}
    </div>
  );
};

export default EditPost;
