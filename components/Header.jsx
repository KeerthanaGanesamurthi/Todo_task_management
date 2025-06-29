import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { FaTasks, FaUserCircle } from 'react-icons/fa';
import { useNavigate, NavLink } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 py-3">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <FaTasks className="me-2" size={24} />
          <span className="fw-bold">Task Manager</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={NavLink} to="/" end>My Tasks</Nav.Link>
                <Nav.Link as={NavLink} to="/shared">Shared Tasks</Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="align-items-center">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="dropdown-user" className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt="User" className="rounded-circle me-2"
                        style={{ width: '36px', height: '36px', objectFit: 'cover' }} />
                    ) : (
                      <FaUserCircle className="me-2" size={28} />
                    )}
                    <span className="d-none d-sm-inline">{user.name}</span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="primary" onClick={() => navigate('/login')} className="px-3">Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
