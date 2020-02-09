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
      textShadow: "-1px 0 lightgray, 0 1px lightgray, 1px 0 lightgray, 0 -1px lightgray",
      color: 'white',
      backgroundColor: rgbColors[0]==rgbColors[1]? 'white' : rgbColors[0],
      backgroundImage: `-webkit-linear-gradient(30deg, ${rgbColors[0]} 50%, ${rgbColors[1]} 50%)`
    }
    return (
      <Jumbotron style={jumbotronStyle}>
        <Container fluid>
          <Row >
            <Col>
              <Image className="image-fill-space" 
                src={`/logos/${this.props.slug}.svg`} 
                ref={img => this.img = img} 
                onError={() => this.img.src = '/no-image-found.svg' }/>
            </Col>
            <Col className="team-header">
              <h2 className="display-4">Upcoming Events</h2>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}

export default TeamHeader
