import React, { Component } from 'react';
import { Modal, Container, Row, Image, Button } from "react-bootstrap";
import LineChart from './LineChart'

function getPriceTextFromList(price_list) {
  const current_price = price_list.length===0 ? null : price_list[price_list.length-1].price;
  return current_price ? `Starting at $${current_price}` : "Currently sold out"
}

class EventModal extends Component {
  render() {
    // const event_details = this.props.event_details
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        test
      </Modal>
    );
  }
}

export default EventModal