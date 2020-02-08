import React, { Component } from 'react';
// import PropTypes from "prop-types"
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class TeamHeader extends Component {
  render () {

    return (
      <Jumbotron variant="primary">
        <Container fluid>
          <Row >
            <Col>
              <Image className="image-fill-space" 
                src={`/logos/${this.props.slug}.svg`} 
                ref={img => this.img = img} 
                onError={() => this.img.src = '/no-image-found.svg' }/>
            </Col>
            <Col className="team-header">
              <h2 className="display-3">Upcoming Events</h2>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}

export default TeamHeader
