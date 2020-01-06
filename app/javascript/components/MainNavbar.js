import React from "react"
// import PropTypes from "prop-types"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
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
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
          {this.props.userSignedIn ? 
          <Nav.Link href="/users/sign_out" data-method="delete">Sign Out</Nav.Link> :
          <Nav.Link href="/users/sign_in">Sign In</Nav.Link> }
        </Navbar>
      </React.Fragment>
    );
  }
}

export default MainNavbar
