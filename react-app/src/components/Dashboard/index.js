import React from "react";
import { useHistory } from 'react-router-dom';
import Logo from "../../assets2/logo.svg"
import "./dash.css";


const DashBoard = () => {
  const history = useHistory();
  
  const createPostForm = () => {
    history.push('/postForm');
  }
  return (
    <>
      <div className="container">
        <div className="main">
          <h2>Users DashBoard</h2>
          <button className="create-post" onClick={createPostForm}>Create Post</button>
          {/* <PostContainer /> */}
        </div>
        <div className="profile-sec"></div>
      </div>
    </>
  );
};

export default DashBoard;
