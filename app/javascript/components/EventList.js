import React, { useState } from 'react';
import {
  Image,
  ListGroup,
  Button,
  ButtonToolbar,
  Container,
  Row,
  Col,
  Modal,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'
import LineChart from './LineChart'
import { getLocalTime, getLocalDate } from '../utils/time';

function getPriceTextFromList(price_list) {
  const current_price = price_list.length===0 ? null : price_list[price_list.length-1].price;
  return current_price ? `Starting at $${current_price}` : "Currently sold out"
}

function EventDetailsModal(props) {
  const event = props.eventdetails
  console.log(props)
  return (
    event && <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {event.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="justify-content-md-center">
            <Image
              className="team-logo-modal"
              src={`/logos/${event.performers.filter((x)=>x.slug!==event.home_team)[0].slug}.svg`}>
            </Image>
            <span className="centered-header"><h3>@</h3></span>
            <Image 
              className="team-logo-modal" 
              src={`/logos/${event.home_team}.svg`}>
            </Image>
          </Row>
          <Row className="centered-header" >
            <h4 className="graph-title">Price Tracker</h4>
          </Row>
          <Row>
            <LineChart data={event.daily_prices}/>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button block 
          variant="secondary"
          target="_blank"
          href={event.url}>
          {getPriceTextFromList(event.last_240_prices)}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function EventList(props) {
  function handleClick(e) {
    e.stopPropagation();
  }
  const followed_event_ids = props.followed_event_ids
  const events = props.events
  const [modalShow, setModalShow] = React.useState(false);
  const [modalEvent, setModalEvent] = React.useState(events[0]);
  console.log(followed_event_ids)
  if (events.length>0) {
    return ( <React.Fragment>
      <EventDetailsModal
        eventdetails ={modalEvent}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ListGroup>
        { events && events.map((event)=> {
          const clientZone = Intl.DateTimeFormat().resolvedOptions().timeZone
          const event_date = getLocalDate(event.event_time_utc, event.timezone)
          const local_date = (clientZone == event.timezone) ? event_time :
            getLocalDate(event.event_time_utc, clientZone)
          const event_time = getLocalTime(event.event_time_utc, event.timezone)
          const local_time = (clientZone == event.timezone) ? event_time :
            getLocalTime(event.event_time_utc, clientZone)
          const isFollowed = followed_event_ids.includes(event.id)
          return (<React.Fragment key={event.id}>
            <ListGroup.Item 
              className="event-list-item" 
              onClick={() => {
                setModalEvent(event);
                setModalShow(true)
              }}
            >
              <OverlayTrigger
                placement="left"
                delay={500}
                overlay={
                  <Tooltip id={`tooltip`}>
                    click for more info
                  </Tooltip>
                }
              >
                <Container>
                  <Row>
                    <Col md="4">{
                      event_time==local_time ? (<div>{`${event_date}`}<br/><small>{`${event_time}`}</small></div>) :
                        event_date==local_date ? (<div>{`${event_date}`}<br/><small>{`${event_time}`}</small>/<small>{`${local_time}`}</small></div>) :
                         (<div><small>{`${event_date+"@"+event_time}`}</small><br/><small>{`${local_date+"@"+local_time}`}</small></div>)
                    }</Col>
                    <Col md>
                      <strong>{event.name}</strong>
                    </Col>
                    <Col md="auto">
                      <ButtonToolbar>
                        <Button
                          size="sm"
                          onClick={handleClick} 
                          variant="secondary"
                          target="_blank"
                          href={event.url}
                        >
                          {getPriceTextFromList(event.last_240_prices)}
                        </Button>
                        <Button
                          size="sm"
                          event_id={event.id}
                          onClick={(e) => props.handleIndividualClick(props.current_user, followed_event_ids, event.id, isFollowed, e)}
                          variant="info"
                        >
                          {isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                      </ButtonToolbar>
                    </Col>
                  </Row>
                </Container>
              </OverlayTrigger>
            </ListGroup.Item>
           </React.Fragment>
          )
        })}
      </ListGroup>
    </React.Fragment>)
  } else {
    return ( <React.Fragment>
      <div>No matching events</div>
    </React.Fragment> )
  }
}


export default EventList