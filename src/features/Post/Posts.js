import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { getAllPostsAsync, createPostAsync } from "./postSlice";

const Posts = () => {
  const [post, setPost] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch]);

  const createPost = () => {
    dispatch(createPostAsync({ text: post }));
  };

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
    </div>
  );
};

export default Posts;
