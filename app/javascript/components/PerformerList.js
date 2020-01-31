import React from "react"
// import PropTypes from "prop-types"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import PerformerLogo from './PerformerLogo'

function performerSort(performers) {
  // sorts performers alpha and puts non venue specific performers at the end
  return performers.sort(function(a,b) {
    if (!a.home_venue_number) {
      return 1
    } else if (!b.home_venue_number){
      return -1
    } else {
      return a.slug<b.slug ? -1 : 1;
    }
  })
}

class PerformerList extends React.Component {
  render () {
    const performers = performerSort(this.props.performers)
    if (performers.length>0) {
      return ( <React.Fragment>
        <Container fluid>
          <Row className="performer-list">
            {performers.map((item) => (
              <Col key={`${item.id}`} className="performer-btn" sm={6} md={3} lg={2}>
                <Card border="light" height="100%">
                  <a className='inner-card' href={`performers/${item.id}`}>
                    <Card.Img 
                      variant="top" 
                      src={`/logos/${item.slug}.svg`} 
                      ref={img => this.img = img} 
                      onError={() => this.img.src = '/no-image-found.svg' } />
                    <Card.Text className="card-team-name">{item.name}</Card.Text>
                  </a>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </React.Fragment> )
    } else {
      return ( <React.Fragment>
        <strong>No matching performers</strong>
      </React.Fragment> )
    }
  }
}

export default PerformerList
