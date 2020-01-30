import React from "react"
// import PropTypes from "prop-types"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

class PerformerLogo extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Image
          // as={Button}
          className="team-logo-sm list-team-logo"
          src={`/logos/${this.props.slug}.png`} 
          ref={img => this.img = img} 
          onError={() => this.img.src = '/no-image-found.png' }
        />
      </React.Fragment>
    );
  }
}

export default PerformerLogo
