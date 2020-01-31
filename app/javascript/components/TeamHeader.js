import React from "react"
// import PropTypes from "prop-types"
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class TeamHeader extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Jumbotron>
          <Container fluid>
            <Row className="team-header">
              <Col>
                <Image className="team-logo" 
                  src={`/logos/${this.props.slug}.svg`} 
                  ref={img => this.img = img} 
                  onError={() => this.img.src = '/no-image-found.svg' }/>
              </Col>
            </Row>
            <Row className="team-header">
              <h2>{this.props.header}</h2>
            </Row>
          </Container>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default TeamHeader
