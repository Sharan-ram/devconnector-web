import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import cx from "classnames";

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

import { Loader, HeaderText } from "../../components/ui";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "80%",
    margin: "0 auto 2.5em",
    display: "grid",
    gridGap: "1.5em",
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
  postsWrapper: {
    display: "grid",
    gridGap: "1em",
  },
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

const Posts = () => {
  const classes = useStyle();

  const [post, setPost] = useState("");

  const { isLoading, posts } = useSelector((state) => state.post);
  const [isProfileLoading, profile] = useMyProfile();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch]);

  const createPost = () => {
    dispatch(createPostAsync({ text: post }));
  };

  if (isLoading || isProfileLoading) return <Loader />;
  if (profile === null) return null;

  const getLikeCountText = (hasUserLiked, likeCount) => {
    if (!hasUserLiked) {
      if (likeCount > 1) return `${likeCount} like this`;
      return `${likeCount} likes this`;
    }
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
    <div className={classes.container}>
      <HeaderText text="Welcome to the community" />
      <div className={classes.header}>
        <h3>Say something...</h3>
      </div>
      <div>
        <TextareaAutosize
          value={post}
          onChange={(e) => setPost(e.target.value)}
          rowsMin={6}
          placeholder="Create a Post"
          className={classes.textArea}
        />
      </div>
      <div>
        <Button
          variant="contained"
          className={classes.submitButton}
          disabled={post === ""}
          onClick={createPost}
        >
          Submit
        </Button>
      </div>
      <div className={classes.postsWrapper}>
        {posts !== null ? (
          posts.map((post) => {
            const {
              likes,
              _id,
              name,
              text,
              date,
              comments,
              avatar,
              user,
            } = post;
            const hasUserLiked = likes.find(
              (like) => like.user === profile.user._id
            );

            return (
              <div key={_id} className={classes.post}>
                <div className={classes.nameAndAvatarWrapper}>
                  <Link className={classes.link} to={`/users/profiles/${user}`}>
                    <div>
                      <img src={avatar} className={classes.image} />
                    </div>
                    <div>
                      <h4 className={classes.name}>{name}</h4>
                    </div>
                  </Link>
                </div>
                <div>
                  <div>
                    <Typography component="p">{text}</Typography>
                  </div>
                  <div className={classes.dateWrapper}>
                    <Typography className={classes.date} component="span">
                      Posted on {moment(date).format("DD-MM-YYYY")}
                    </Typography>
                  </div>
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
                    <div>
                      <Button
                        onClick={() =>
                          history.push({
                            pathname: `/posts/${_id}`,
                            state: {
                              post,
                              profile,
                              postId: _id,
                            },
                          })
                        }
                        className={classes.discussionButton}
                        variant="contained"
                      >
                        Discussion
                        {comments.length === 0 ? "" : `(${comments.length})`}
                      </Button>
                    </div>
                    {post.user === profile.user._id && (
                      <div>
                        <Button
                          variant="contained"
                          className={classes.deletePost}
                        >
                          Delete Post
                        </Button>
                      </div>
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
