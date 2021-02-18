import React from "react";
import { Nav,Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom'

function NavbarPOS() {

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand><Link to="/">POS System</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href='/menu'>View Menu</Nav.Link>
          <Nav.Link href='/order'>Add New Order</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarPOS;
