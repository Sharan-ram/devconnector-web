import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Like from "@material-ui/icons/ThumbUp";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { getAllPostsAsync, createPostAsync } from "./postSlice";

const useStyle = makeStyles({
  post: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
  },
});

const Posts = () => {
  const classes = useStyle();
  const [post, setPost] = useState("");
  const { isLoading, posts } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch]);

  const createPost = () => {
    dispatch(createPostAsync({ text: post }));
  };

  if (isLoading) return <div>Loading profile...</div>;

  return (
    <div>
      <h3>Welcome to the community</h3>
      <span>Say something</span>
      <div>
        <TextareaAutosize
          value={post}
          onChange={(e) => setPost(e.target.value)}
          minRows={6}
          placeholder="Create a Post"
        />
        <Button disabled={post === ""} onClick={createPost}>
          Submit
        </Button>
      </div>
      <div>
        {posts !== null ? (
          posts.map((post) => {
            const { likes, id, name, text, date, comments } = post;
            return (
              <div key={id} className={classes.post}>
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
                    <Button>
                      <Like />
                      {likes.length === 0 ? "" : likes.length}
                    </Button>
                    <Button>
                      Discussion
                      {comments.length === 0 ? "" : comments.length}
                    </Button>
                    <Button>Delete Post</Button>
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
