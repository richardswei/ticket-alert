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
            <Row>
              <Col md={3}>
                <Image className="team-logo" src={`/logos/${this.props.slug}.png`}></Image>
              </Col>
              <Col md={9}>
                <h4>Upcoming Events for {this.props.team}</h4>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default TeamHeader
