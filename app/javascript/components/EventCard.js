import React from "react"
// import PropTypes from "prop-types"
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

class EventCard extends React.Component {
  render () {
    return (
      <Card className="event-card-main">
        <Card.Header>
          <Row>
            <Col md={{span: 4, offset: 1 }}>
              <Image className="team-logo" src={`/logos/${this.props.awayTeam}.png`} rounded />
            </Col>
            <Col md={2}>
              <div>@</div>
            </Col>
            <Col md={4}>
              <Image className="team-logo" src={`/logos/${this.props.homeTeam}.png`} rounded />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>{this.props.eventName}</Card.Title>
          <Card.Text>{this.props.eventTime}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default EventCard
