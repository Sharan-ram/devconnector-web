import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";

import { addCommentAsync, deleteCommentAsync } from "./postSlice";

import useMyProfile from "../../hooks/useMyProfile";
import usePost from "../../hooks/usePost";
import { Loader } from "../../components/ui";

const useStyle = makeStyles({
  post: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
  },
});

const EditPostComponent = ({
  history: {
    location: { state },
  },
  match: {
    params: { id },
  },
}) => {
  const classes = useStyle();
  const [isProfileLoading, profile] = useMyProfile(state);
  const [isLoading, post] = usePost(state, id);

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  if (isLoading || isProfileLoading) return <Loader />;
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

const EditPost = withRouter(EditPostComponent);

export default EditPost;
