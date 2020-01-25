import React from "react"
// import PropTypes from "prop-types"
import Button from 'react-bootstrap/Button'

class ButtonLink extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Button
          href={this.props.path}
          data-method={this.props.method}
        >{this.props.buttonText}</Button>
      </React.Fragment>
    );
  }
}

export default ButtonLink
