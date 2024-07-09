// NavBar.js
import React, { useState, useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../pages/AuthContext';

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { state, logout } = useContext(AuthContext);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const userPictureUrl = state.user?.picture;

  return (
    <div className="navbarcustom">
    <header className="header_section">
      <div className="container-fluid">
        <Navbar expand="lg" variant="dark" className="custom_nav-container">
          <Navbar.Brand as={Link} to="/">
            <span>Zee.</span>Tools
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse id="navbarCollapse">
            <Nav className="navbar-nav">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/tools">Tools</NavItem>
              <NavItem to="/contact">Contact</NavItem>
              {state.user ? (
                <>
                  <NavDropdown title={state.user.name} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                  <div className="zee_profile">
                    {userPictureUrl && (
                      <img src={userPictureUrl} alt="User" className="zee_picture rounded-circle" />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <NavItem to="/login">Login</NavItem>
                  <NavItem to="/register">Register</NavItem>
                </>
              )}
                <form className="form-inline ml-auto">
                <button className="btn my-2 my-sm-0 nav_search-btn" type="submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
    </div>
  );
};

const NavItem = ({ to, children, onClick }) => (
  <Nav.Item>
    <Nav.Link as={NavLink} to={to} onClick={onClick} activeClassName="active">
      {children}
    </Nav.Link>
  </Nav.Item>
);

export default NavBar;
