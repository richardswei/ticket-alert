import React, { Component } from 'react';
import { hexToRgb } from '../utils/colorsUtilities';
// import PropTypes from "prop-types"
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class TeamHeader extends Component {
  render () {
    const hexColors = this.props.colors;
    const rgbColors = hexColors.map((hex) => {
      if (!hex) {
        return "rgb(0,0,0)"
      }
      const rgbHash = hexToRgb(hex);
      const rgbaString = `rgba(${rgbHash.r},${rgbHash.g},${rgbHash.b},0.8)`
      // console.log(rgbString)
      return rgbaString
    })
    rgbColors[0] = rgbColors[0]==rgbColors[1] ? 'aliceblue' : rgbColors[0];
    const jumbotronStyle = {
      color: 'white',
      backgroundColor: rgbColors[0]==rgbColors[1]? 'white' : rgbColors[0],
      backgroundImage: `-webkit-linear-gradient(30deg, ${rgbColors[0]} 50%, ${rgbColors[1]} 50%)`
    }
    return (
      <Jumbotron style={jumbotronStyle}>
        <Container fluid>
          <Row>
            <Col sm={12} md={6}>
              <Image className="drop-shadow image-fill-space" 
                src={`/logos/${this.props.slug}.svg`} 
                ref={img => this.img = img} 
                onError={() => this.img.src = '/no-image-found.svg' }/>
            </Col>
            <Col className="team-header">
              <div className="team-header-text">Upcoming Events</div>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}

export default TeamHeader
