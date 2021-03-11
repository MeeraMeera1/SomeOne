import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Logo from '../../../public/assets/brandmark-design_1.png'
import './Navbar.css'

const NavBar = ({ setAuthenticated, authenticated }) => {
  return (
    <nav className="nav">
      <div className="nav-flex">
        <NavLink className="left-nav" exact to="/">
          <img src={Logo} alt="someOne" className="logo" />
        </NavLink>
        {!authenticated && (
          <div className="right-nav">
            <ul>
              <li>
                <NavLink to="/login" exact={true} activeClassName="active" className="link">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/sign-up" exact={true} activeClassName="active" className="link">
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/sign-up" exact={true} activeClassName="active" className="button">
                  Get Started
                </NavLink>
              </li>
              <li>
                <LogoutButton setAuthenticated={setAuthenticated} />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;