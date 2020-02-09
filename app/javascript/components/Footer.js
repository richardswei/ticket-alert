import React, { Component } from 'react';
import { Col, Container, Row, Navbar, Nav } from "react-bootstrap";
class Footer extends Component {
  render () {
    return (<Navbar variant="dark" bg="dark" sticky="bottom" className="font-small pt-4 mt-4">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Footer;