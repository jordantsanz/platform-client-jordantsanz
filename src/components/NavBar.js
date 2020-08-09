import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ props }) => {
  return (
    <nav className="navbar">
      <NavLink exact to="/" className="main-navlink">Home</NavLink>
      <NavLink to="/posts/new" className="new-navlink">Write a New Post!</NavLink>
    </nav>
  );
};

export default NavBar;
