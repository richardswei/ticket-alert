import React from "react"
import Jumbotron from "react-bootstrap/Jumbotron"

class JumbotronPageHeader extends React.Component {
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
