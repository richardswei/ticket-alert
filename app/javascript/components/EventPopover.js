import React, { Component } from 'react';
import { Popover, Container, Row, Image, Button } from "react-bootstrap";
import LineChart from './LineChart'

function getPriceTextFromList(price_list) {
  const current_price = price_list.length===0 ? null : price_list[price_list.length-1].price;
  return current_price ? `Starting at $${current_price}` : "Currently sold out"
}

class EventPopover extends Component {
  render() {
    // const event_details = this.props.event_details
    return (
      <Popover id="popover-contained">
        <Popover.Title as="h3">Popover bottom</Popover.Title>
        <Popover.Content>
          <strong>Holy guacamole!</strong> Check this info.
        </Popover.Content>
      </Popover>
    );
  }
}

export default EventPopover