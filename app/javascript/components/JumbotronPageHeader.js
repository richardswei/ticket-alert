import React, { Component } from 'react';
import Jumbotron from "react-bootstrap/Jumbotron"

class JumbotronPageHeader extends Component {
  render () {
    return (
      <Jumbotron>
        <h1>{this.props.header}</h1>
        <p>{this.props.text}</p>
      </Jumbotron>
    );
  }
}

export default JumbotronPageHeader
