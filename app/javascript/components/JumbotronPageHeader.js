import React, { Component } from 'react';
import Jumbotron from "react-bootstrap/Jumbotron"

class JumbotronPageHeader extends Component {
  render () {
    return (
      <Jumbotron fluid>
        <h2 className="display-4">{this.props.header}</h2>
        <p className="lead">{this.props.text}</p>
      </Jumbotron>
    );
  }
}

export default JumbotronPageHeader
