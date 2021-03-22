import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import styled from "styled-components";
import Logo from "../../assets2/logo.svg";

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
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 10rem;
  font-family: Hebrew;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: block;
`;

const NavWrapper = styled.ul`
  display: flex;
  list-style: none;
  box-sizing: border-box;
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
  position: relative;
`;



const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  let sessionLinks;

  if(!!user) {
    sessionLinks = (
      <>
      <NavItem>
        <LogoutButton />
      </NavItem>
      </>
    )
  } else {
    sessionLinks = (
      <>
      <NavItem>
        <LoginForm />
      </NavItem>
      <NavItem>
        <SignUpForm />
      </NavItem>
      <NavLink className="nav-item" to="/getstarted" exact={true} activeClassName='active'>
        Get Started
      </NavLink>
      </>    
    )
  }
  return (
    <SiteHeader>
      <SiteHeaderWrapper>
        <a className="logo-anchor" href='/'>
          <img className="logo" alt="someOne" src={Logo} />
        </a>
        <Nav>
          <NavWrapper>{sessionLinks}</NavWrapper>
        </Nav>
      </SiteHeaderWrapper>
    </SiteHeader>
  );
};

export default NavBar;
