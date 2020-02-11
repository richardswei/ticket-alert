import React, { Component } from 'react';
import { Modal, Container, Row, Image, Button } from "react-bootstrap";
import LineChart from './LineChart'

function getPriceTextFromList(price_list) {
  const current_price = price_list.length===0 ? null : price_list[price_list.length-1].price;
  return current_price ? `Starting at $${current_price}` : "Currently sold out"
}

class EventModal extends Component {
  render() {
    const event_details = this.props.event_details
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {event_details.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <Image
                className="team-logo-modal"
                src={`/logos/${event_details.performers.filter((x)=>x.slug!==event_details.home_team)[0].slug}.svg`}>
              </Image>
              <span className="centered-header"><h3>@</h3></span>
              <Image 
                className="team-logo-modal" 
                src={`/logos/${event_details.home_team}.svg`}>
              </Image>
            </Row>
            <Row className="centered-header" >
              <h4 className="graph-title">Price Tracker</h4>
            </Row>
            <Row>
              <LineChart data={event_details.daily_prices}/>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button block 
            variant="secondary"
            target="_blank"
            href={event_details.url}>
            {getPriceTextFromList(event_details.last_240_prices)}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EventModal