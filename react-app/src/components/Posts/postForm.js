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



  const updateImageFile = (e) => {
    const file = e.target.files[0];
    if (file) setPostImg(file);
  };

  <div className="postForm">
    <form onSubmit={submitPost}>
      <div>
        <label htmlFor="post">Whatever your heart desires</label>
        <textarea
          name="posttext"
          type="text"
          placeholder="What's going on?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="img">Got a pic?</label>
        <input
          name="imgUrl"
          type="file"
        //   value={postImg}
          onChange={updateImageFile}
        />
      </div>
      <div>
        <label htmlFor="post">Wanna Tag It?</label>
        <input
          name="postTag"
          type="text"
          placeholder="Add Tags here"
          value={postTags}
          onChange={(e) => setPostTags(e.target.value)}
        />
      </div>
    </form>
  </div>;
};
