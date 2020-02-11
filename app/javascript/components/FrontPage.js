import React, { Component } from 'react';
// import PropTypes from "prop-types"
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class FrontPage extends Component {
  render () {
    return (
      <React.Fragment>
        <Jumbotron fluid>
          <h2 className="display-4">Welcome to TicketAlert</h2>
          <p className="lead">You can use this site to follow sports events and be notified when prices on SeatGeek go down! 
            <a href="/users/sign_up"> Sign up here!</a>
          </p>
        </Jumbotron>
        <Container>
          <Row>
            <Col xs={9} md={10}>
              <Image className="adLink" rounded src="holder.js/100px300?auto=yes&theme=social&text=Big Ad" fluid />
            </Col>  
            <Col xs={3} md={2}>
              <Row>
                <a href={`/performers/${100}`}>
                  <Image className="adLink"  fluid src="https://i.redd.it/xgc23ih4ady31.png"/>
                </a>
              </Row>
              <Row>
                <Image className="adLink" rounded src="holder.js/100px150?theme=social" fluid />
              </Row>
            </Col>
          </Row>
          <Row>
            <br/>
          </Row>
          <Row>
            <Col xs={9} md={10}>
              <Image className="adLink" rounded src="holder.js/100px300?auto=yes&theme=social" fluid />
            </Col>
            <Col xs={3} md={2}>
              <Row>
                <a target="_blank" href={`https://youtu.be/M2XNW1qHN9w`}>
                  <Image className="adLink" fluid src="https://cdn.pixabay.com/photo/2016/10/10/01/49/delete-1727486_960_720.png"/>
                </a>
              </Row>
              <Row>
                <Image className="adLink" rounded src="holder.js/100px150?theme=social" fluid />
              </Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default FrontPage
