import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createPost } from "../../store/post";
import "./postForm.css"
// import styled from "styled-components";

const PostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const [post, setPost] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [errors, setErrors] = useState([]);

  const submitPost = async (e) => {
    e.preventDefault();
    setErrors([]);
    let newErrors = [];

    const newPost = {
      post,
      imgUrl
    };

    const postOrErrors = await dispatch(createPost(newPost));

    if (postOrErrors.errors) {
      newErrors = postOrErrors.errors;
      setErrors(newErrors);
    } else {
      history.push("/dashboard");
    }
  };

  const updateImageFile = (e) => {
    const file = e.target.files[0];
    if (file) setImgUrl(file);
  };

  return (
    <div className="postForm">
    <form onSubmit={submitPost}>
      <div>
        <label htmlFor="post">Whatever your heart desires</label>
        <textarea
          name="posttext"
          type="text"
          placeholder="What's going on?"
          value={post}
          onChange={(e) => setPost(e.target.value)}
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
        <button type="submit">Submit</button>
      </div>
      <div>
        {errors.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>
    </form>
  </div>
  );
};

export default PostForm;
