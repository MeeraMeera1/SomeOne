import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createPost } from "../../store/post";
// import styled from "styled-components";

const PostForm = () => {
  const dispatch = useDispatch();
  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState("");
  const [postTags, setPostTags] = useState("");

  <div className="postForm">
    <form onSubmit={submitPost}>
      <div>
        <label htmlFor="post">Whatever your heart desires</label>
        <input name="posttext" />
      </div>
    </form>
  </div>;
};
