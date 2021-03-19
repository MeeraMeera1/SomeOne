import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import styled from "styled-components";

const SiteHeader = styled.header`
  position: sticky;
  z-index: 10;
  width: 100%;
  top: 0;
  backgroung-color: transparent;
`;

const SiteHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1240px;
  padding-left: 1rem;
  padding:
`;



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
        <li>
          <SignUpForm />
        </li>
        <li>
          <LoginForm />
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
        ) : null}
      </ul>
    </nav>
  );
};

export default NavBar;
