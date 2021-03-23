import React from "react";
import Logo from "../../assets2/logo.svg"
import "./dash.css";


const DashBoard = () => {
  

  return (
    <>
      <div className="container">
        <div className="side-nav">
          <div className="side-menu">
            <div className="logo">
              <img src={Logo} alt="someOne" />
            </div>
            <ul>
              <li>
                <a href="/dash">
                  <span>DashBoard</span>
                </a>
              </li>
              <li>
                <a href="/chatroom">
                  <span>Chat Party</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="main">
          <h2>Users DashBoard</h2>
          <button className="create-post" onClick={createPostForm}>Create Post</button>
        </div>
        <div className="profile-sec"></div>
      </div>
    </>
  );
};

export default DashBoard;
