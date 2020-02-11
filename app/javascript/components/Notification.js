import React, { Component } from 'react';
// import PropTypes from "prop-types"
import Alert from 'react-bootstrap/Alert'

class Notification extends Component {
  render () {
    return (
      <React.Fragment>
        <Alert variant={this.props.variant}>
          {this.props.text}
        </Alert>
      </React.Fragment>
    );
  }
}

export default Notification
