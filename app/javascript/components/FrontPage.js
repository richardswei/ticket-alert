import React, { Component } from 'react';
// import PropTypes from "prop-types"
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Carousel from 'react-bootstrap/Carousel'

class FrontPage extends Component {
  render () {
    const jumbotronNFL = {
      backgroundImage: `url(logos/nfl-logo.svg)`,
      backgroundColor: "rgba(39,79,180,0.3)",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    const jumbotronMLB = {
      backgroundImage: `url(logos/mlb-logo.svg)`,
      backgroundColor: "rgba(39,79,180,0.3)",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    const jumbotronNBA = {
      backgroundImage: `url(logos/nba-logo.svg)`,
      backgroundColor: "rgba(39,79,180,0.3)",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    const jumbotronNHL = {
      backgroundImage: `url(logos/nhl-logo.svg)`,
      backgroundColor: "rgba(39,79,180,0.3)",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    return (
      <React.Fragment>
        <Jumbotron fluid>
          <h2 className="display-4">Welcome to TicketAlert</h2>
          <p className="lead">You can use this site to follow sports events and be notified when prices on SeatGeek go down! 
            <a href="/users/sign_up"> Sign up here!</a>
          </p>
        </Jumbotron>
        <a className="frontPageLink" href="performers/nfl"><Jumbotron style={jumbotronNFL} fluid>
          <h2 className="display-3">NFL</h2>
        </Jumbotron></a>
        <a className="frontPageLink" href="performers/mlb"><Jumbotron style={jumbotronMLB} fluid>
          <h2 className="display-3">MLB</h2>
        </Jumbotron></a>
        <a className="frontPageLink" href="performers/nba"><Jumbotron style={jumbotronNBA} fluid>
          <h2 className="display-3">NBA</h2>
        </Jumbotron></a>
        <a className="frontPageLink" href="performers/nhl"><Jumbotron style={jumbotronNHL} fluid>
          <h2 className="display-3">NHL</h2>
        </Jumbotron></a>
        <Container>
          <Row>
            <Col md={4}>
              <a target="_blank" href={`https://youtu.be/M2XNW1qHN9w`}>
                <Image className="adLink" fluid src="https://cdn.pixabay.com/photo/2016/10/10/01/49/delete-1727486_960_720.png"/>
              </a>
            </Col>
            <Col md={4}>
              <a target="_blank" href={`https://youtu.be/M2XNW1qHN9w`}>
                <Image className="adLink" fluid src="https://cdn.pixabay.com/photo/2016/10/10/01/49/delete-1727486_960_720.png"/>
              </a>
            </Col> 
            <Col md={4}>
              <a href="/">
                <Image className="adLink"  fluid src="https://i.redd.it/xgc23ih4ady31.png"/>
              </a>
            </Col>  
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default FrontPage
