import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createPost } from "../../store/post";
// import styled from "styled-components";

const PostForm = () => {
  const dispatch = useDispatch();
  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [postTags, setPostTags] = useState("");

  <div className="postForm">
    <form onSubmit={submitPost}>
      <div>
        <label htmlFor="post">Whatever your heart desires</label>
        <textarea
          name="posttext"
          type="text"
          placeholder="What's going on?"
          value={postText}
          onChange={updatePostText}
        ></textarea>
      </div>
      <div>
        <label htmlFor="img">Got a pic?</label>
        <input
          name="imgUrl"
          type="file"
          value={postImg}
          onChange={updatePostImg}
        />
      </div>
      <div>
        <label htmlFor="post">Wanna Tag It?</label>
        <input
          name="postTag"
          type="text"
          placeholder="Add Tags here"
          value={postTags}
          onChange={updatePostTags}
        />
      </div>
    </form>
  </div>;
};
