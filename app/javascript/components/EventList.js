import React, { useState } from 'react';
import {
  Image,
  ListGroup,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'
import LineChart from './LineChart'
import { getLocalTime, getLocalDate } from '../utils/time';

function addFollow(event_id, csrf_token) {
  fetch(event_id+'/add_individual_follow', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // redirect: 'follow', // manual, *follow, error
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf_token
    },
    // body: JSON.stringify({'id': event.id})
  })
}

function deleteFollow(event_id, csrf_token) {
  fetch(event_id+'/delete_individual_follow', {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    // redirect: 'follow', // manual, *follow, error
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf_token
    },
    // body: JSON.stringify({'id': event.id})
  })
}

function getPriceTextFromList(price_list) {
  const current_price = price_list.length===0 ? null : price_list[price_list.length-1].price;
  return current_price ? `Starting at $${current_price}` : "Currently sold out"
}

function EventDetailsModal(props) {
  const event = props.eventdetails
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
            <Col md="4">
              <Image 
                className="team-logo-modal" 
                src={`/logos/${event.performers.filter((x)=>x.slug!==event.home_team)[0].slug}.svg`}>
              </Image>
            </Col>
            <Col xs="auto" className="centered-header">
              <span><h1>@</h1></span>
            </Col>
            <Col md="4">
              <Image 
                className="team-logo-modal" 
                src={`/logos/${event.home_team}.svg`}>
              </Image>
            </Col>
          </Row>
          <Row className="centered-header" >
            <h4 className="graph-title">Price Tracker</h4>
          </Row>
          <Row>
            <LineChart data = {event.daily_prices}/>
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
  function handleFollow(id, isFollowed, e) {
    e.stopPropagation();
    console.log(followedEvents)
    console.log(isFollowed)
    console.log(id)
    // ids = 
    if (isFollowed) { // remove the id
      const followList = followedEvents.filter((x)=> x!==id)
      console.log(followList)
      setFollowed(followList)
    } else {
      const followList = [id, ...followedEvents]
      setFollowed(followList)
    }
  }
  const followed_event_ids = props.followed_event_ids
  const events = props.events
  const [modalShow, setModalShow] = React.useState(false);
  const [modalEvent, setModalEvent] = React.useState(events[0]);
  const [followedEvents, setFollowed] = React.useState(followed_event_ids);
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
          const isFollowed = followedEvents.includes(event.id)
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
                      <div>{event.name}</div>
                    </Col>
                    <Col md="3">
                      <Row>
                        <Button
                          event_id={event.id}
                          onClick={(e) => handleFollow(event.id, isFollowed, e)}
                          variant="info"
                        >
                          {isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                      </Row>
                      <Row>
                        <Button block 
                          onClick={handleClick} 
                          variant="secondary"
                          target="_blank"
                          href={event.url}
                        >
                          {getPriceTextFromList(event.last_240_prices)}
                        </Button>
                      </Row>
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