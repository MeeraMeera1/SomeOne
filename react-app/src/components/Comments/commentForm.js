import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./comments.css";
import smilyIcon from "../../images/icons/insta_smily_face_icon.png";
import { createComment } from "../../Store/comments";

const CommentForm = (props) => {
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.session.user);
  const postId = props.postId;
  const dispatch = useDispatch();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!content) return alert("there is no content");
    const userId = user.id;
    dispatch(createComment(userId, postId, content));
  };

  return (
    <div className="comment-form__container">
      <img
        alt="smile emoji"
        className="comment-form__icon"
        src={smilyIcon}
      ></img>
      <form className="commentform" onSubmit={formSubmitHandler}>
        <input
          className="comment-form__input"
          placeholder="Add a comment..."
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <button type="submit" className="comment-form__button">
          Post
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
