import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createPost } from "../../store/post";
// import styled from "styled-components";

const PostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [postTags, setPostTags] = useState("");
  const [errors, setErrors] = useState([]);

  const submitPost = async (e) => {
    e.preventDefault();
    setErrors([]);
    let newErrors = [];

    const post = {
      display_name_id: currentUser.id,
      postText,
      postImg,
      postTags,
    };

    const postOrErrors = await dispatch(createPost(post));

    if (postOrErrors.errors) {
      newErrors = postOrErrors.errors;
      setErrors(newErrors);
    } else {
      history.pushState("/dashboard");
    }
  };

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
      <div>
        <button type="submit">Submit</button>
      </div>
      <div>
        {errors.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>
    </form>
  </div>;
};

export default PostForm;
