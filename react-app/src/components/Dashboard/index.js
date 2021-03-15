import React, { useEffect } from "react";
import Posts from "../Posts";
import { useDispatch } from "react-redux";
import "./dash.css";
import * as commentActions from "../../store/comment";
import * as postActions from "../../store/post";
import { getUsers } from "../../store/user";

const DashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.getPosts());
    dispatch(getUsers());
    dispatch(commentActions.getComments());
  }, [dispatch]);

  return (
    <>
      <div className="landing__container">
        <div className="posts__feed">
          <Posts />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
