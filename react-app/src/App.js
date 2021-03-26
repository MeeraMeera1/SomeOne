import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./components/HomePage";
import DashBoard from "./components/Dashboard";
import PostForm from "./components/PostForm";
import NavBar from "./components/Navbar"

import { authenticate } from "./store/session"
// import NavBar from "./components/Navbar";
// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
// import NavBar from "./components/NavBar";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
// import User from "./components/User";
// import { authenticate } from "./services/auth";

function App() {
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    dispatch(authenticate()).then(() => setLoaded(true));
  }, [dispatch]);

  // if (user) {
  //   return null;
  // }


  // const [authenticated, setAuthenticated] = useState(false);
  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   (async() => {
  //     const user = await authenticate();
  //     if (!user.errors) {
  //       setAuthenticated(true);
  //     }
  //     setLoaded(true);
  //   })();
  // }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/dashboard" exact>
          <DashBoard />
        </Route>
        <Route path="/postForm" exact>
          <PostForm />
        </Route>
      </Switch>
      {/* <NavBar setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch> */}
    </BrowserRouter>
  );
}

export default App;
