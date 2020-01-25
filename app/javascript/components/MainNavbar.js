import React from "react"
// import PropTypes from "prop-types"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class MainNavbar extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/"><h2>Ticket Alert</h2></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/performers">Performers</Nav.Link>
            <Nav.Link href="/venues">Venue</Nav.Link>
          </Nav>
          <Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
            {this.props.userSignedIn ? <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/users/my_profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/users/sign_out" data-method="delete">Sign Out</NavDropdown.Item>
            </NavDropdown> : <Nav.Link href="/users/sign_in">Sign In</Nav.Link> }
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default MainNavbar
