import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import "./navbar.css";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to="/users" exact activeClassName="active">
                Users
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </>
        ) : (
          <>
            <li>
              <SignUpForm />
            </li>
            <li>
              <LoginForm />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
