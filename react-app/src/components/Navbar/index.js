import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import LoginForm from "../auth/LoginForm";

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
              <NavLink to="/sign-up" exact activeClassName="active">
                Sign Up
              </NavLink>
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
