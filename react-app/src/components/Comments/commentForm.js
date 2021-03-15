import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./comments.css";
import { newComment } from "../../store/comment";
import { BiComment } from "react-icons/bi";

const CommentForm = (props) => {
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.session.user);
  const postId = props.postId;
  const dispatch = useDispatch();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!comment) return alert("there is no content");
    dispatch(newComment( postId, comment ));
  };

  return (
    <div className="comment-form__container">
    <BiComment />
      <form className="commentform" onSubmit={formSubmitHandler}>
        <input
          className="comment-form__input"
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button type="submit" className="comment-form__button">
          Post
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
