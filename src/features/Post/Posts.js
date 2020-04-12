import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Like from "@material-ui/icons/ThumbUp";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import {
  getAllPostsAsync,
  createPostAsync,
  handleLikeOrUnlikeAsync,
} from "./postSlice";
import useMyProfile from "../../hooks/useMyProfile";

const useStyle = makeStyles({
  post: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
  },
  like: {
    fill: "#3b5998",
  },
});

const Posts = () => {
  const classes = useStyle();

  const [post, setPost] = useState("");
  const [postId, redirectToPost] = useState();

  const { isLoading, posts } = useSelector((state) => state.post);
  const [isProfileLoading, profile] = useMyProfile();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch]);

  const createPost = () => {
    dispatch(createPostAsync({ text: post }));
  };

  if (isLoading || isProfileLoading) return <div>Loading profile...</div>;
  if (profile === null) return null;

  if (postId) return <Redirect to={`/posts/${postId}`} />;

  const getLikeCountText = (hasUserLiked, likeCount) => {
    if (!hasUserLiked) return likeCount;
    if (likeCount === 1) return "You like this";
    if (likeCount === 2) return "You and one other like this";
    return `You and ${likeCount} others like this`;
  };

  const handleLikeOrUnlike = (postId, hasUserLiked) => {
    let url;
    if (hasUserLiked) {
      url = `${process.env.REACT_APP_API_URL}/api/posts/${postId}/unlike`;
    } else {
      url = `${process.env.REACT_APP_API_URL}/api/posts/${postId}/like`;
    }
    dispatch(handleLikeOrUnlikeAsync({ url, user: profile.user._id }));
  };

  return (
    <div>
      <h3>Welcome to the community</h3>
      <span>Say something</span>
      <div>
        <TextareaAutosize
          value={post}
          onChange={(e) => setPost(e.target.value)}
          rowsMin={6}
          placeholder="Create a Post"
        />
        <Button disabled={post === ""} onClick={createPost}>
          Submit
        </Button>
      </div>
      <div>
        {posts !== null ? (
          posts.map((post) => {
            const { likes, _id, name, text, date, comments } = post;
            const hasUserLiked = likes.find(
              (like) => like.user === profile.user._id
            );

            return (
              <div key={_id} className={classes.post}>
                <div>{name}</div>
                <div>
                  <div>
                    <Typography component="p">{text}</Typography>
                  </div>
                  <div>
                    <Typography component="span">
                      Posted on {moment(date).format("DD-MM-YYYY")}
                    </Typography>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleLikeOrUnlike(_id, hasUserLiked)}
                    >
                      <Like className={hasUserLiked && classes.like} />
                    </Button>
                    {likes.length !== 0
                      ? getLikeCountText(hasUserLiked, likes.length)
                      : ""}
                    <Button onClick={() => redirectToPost(_id)}>
                      Discussion
                      {comments.length === 0 ? "" : `(${comments.length})`}
                    </Button>
                    {post.user === profile.user._id && (
                      <Button>Delete Post</Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No posts</div>
        )}
      </div>
    </div>
  );
};

export default Posts;
