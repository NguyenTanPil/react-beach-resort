import React, { useState } from 'react';
import logo from '../images/logo.svg';
import { FaAlignRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

Navbar.propTypes = {};

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <NavLink to="/">
            <img src={logo} alt="brand" />
          </NavLink>
          <button type="button" className="nav-btn" onClick={handleToggle}>
            <FaAlignRight className="nav-icon" />
          </button>
        </div>
        <ul className={isOpen ? 'nav-links show-nav' : 'nav-links'}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/rooms">Rooms</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
