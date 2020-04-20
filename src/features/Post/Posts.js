import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { makeStyles } from "@material-ui/core/styles";

import { getAllPostsAsync, createPostAsync } from "./postSlice";
import useMyProfile from "../../hooks/useMyProfile";

import { Loader, HeaderText, PostOrComment } from "../../components/ui";

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
}));

const Posts = () => {
  const classes = useStyle();

  const [post, setPost] = useState("");

  const { isLoading, posts } = useSelector((state) => state.post);
  const [isProfileLoading, profile] = useMyProfile();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch]);

  const createPost = () => {
    dispatch(createPostAsync({ text: post }));
  };

  if (isLoading || isProfileLoading) return <Loader />;
  if (profile === null) return null;

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
              avatar,
              user,
              comments,
            } = post;

            return (
              <PostOrComment
                key={_id}
                _id={_id}
                link={`/users/profiles/${user}`}
                name={name}
                text={text}
                date={date}
                avatar={avatar}
                likes={likes}
                variant="post"
                type="show"
                postDetails={{
                  comments,
                  historyPushObject: {
                    pathname: `/posts/${_id}`,
                    state: {
                      post,
                      profile,
                      postId: _id,
                    },
                  },
                }}
              />
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
