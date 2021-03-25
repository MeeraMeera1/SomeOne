import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// import custom hook
import { useWindowWidth } from "../../services/windowWidth";

// import components
import SignUpFormModal from "../auth/SignUpFormModal";
import LoginFormModal from "../auth/LoginFormModal";
import SessionLinksDropdown from "./SessionLinksDropdown";
import LogoutButton from "../auth/LogoutButton";
import Logo from "../../assets2/logo.svg"

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const width = useWindowWidth();

  let sessionLinks;

  if (!!sessionUser) {
    if (width > 800) {
      sessionLinks = (
        <>
          <LogoutButton />
        </>
      );
    } else {
      sessionLinks = null;
    }
  } else {
    if (width > 800) {
      sessionLinks = (
        <>
          <li className="nav__item">
            <LoginFormModal />
          </li>
          <li className="nav__item">
            <SignUpFormModal />
          </li> 
          <li className="nav__item">
            <NavLink
              className="nav__item"
              to="/browse"
              exact={true}
              activeClassName="active"
            >
              Get Started
            </NavLink>
          </li>
        </>
      );
    } else {
      sessionLinks = <SessionLinksDropdown />;
    }
  }

  return (
    <header className="sticky z-10 w-full top-0 bg-transparent">
      <div className="site-header__wrapper">
        <a className="logo-anchor" href="/">
          <img
            className="logo"
            alt="someOne"
            src={Logo}
          ></img>
        </a>
        <nav className="nav">
          <ul className="nav__wrapper">{sessionLinks}</ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
