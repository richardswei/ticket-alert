import React, { Component } from 'react';
import { Col, Container, Row, Navbar, Nav, Button } from "react-bootstrap";
class Footer extends Component {
  render () {
    return (<Navbar variant="dark" 
        bg="dark" 
        sticky="bottom" 
        className="footer font-small pt-4 mt-4">
        <Navbar.Brand href="/">TicketAlert</Navbar.Brand>
        <Container>
          <Row>
            <Col md="auto">
              <div>
                <a href="/">Home</a>
              </div>
              <div>
                <a target="_blank" href="https://platform.seatgeek.com/">Powered by SeatGeek</a>
              </div>
              <div>
                <a target="_blank" href="https://logotyp.us/">Logos obtained from Logotyp.us</a>
              </div>              
              <div>
                <a target="_blank" href="https://github.com/richardswei/ticket-alert">Github Repo</a>
              </div>
              <div>
                <a >&copy; Richard Wei</a>
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;