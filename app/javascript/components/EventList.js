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
function getLocalDate(dateTime, timezone) {
  const d = new Date(dateTime);
  const options = { weekday: 'short', year: 'numeric', month: 'short', timeZone: timezone, day: 'numeric'};
  return d.toLocaleDateString(undefined, options); 
}

function getLocalTime(dateTime, timezone) {
  const d = new Date(dateTime);
  const options = {hour: 'numeric', minute: 'numeric', timeZone: timezone, timeZoneName: 'short' };
  return d.toLocaleTimeString(undefined, options); 
}

function getPriceTextFromList(price_list) {
  const current_price = price_list.length===0 ? null : price_list[price_list.length-1].price;
  const linkText = current_price ? `Starting at $${current_price}` : "Currently sold out"
  return linkText
}

function EventDetailsModal(props) {
  const event = props.eventdetails
  console.log(props.eventdetails)
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
          <Row>
            <Col>
              <Image 
                className="team-logo-modal" 
                src={`/logos/${event.performers.filter((x)=>x.slug!==event.home_team)[0].slug}.svg`}>
              </Image>
            </Col>
            <Col xs="auto" className="matchup-at-symbol">
              <span><h1>@</h1></span>
            </Col>
            <Col>
              <Image 
                className="team-logo-modal" 
                src={`/logos/${event.home_team}.svg`}>
              </Image>
            </Col>
          </Row>
          <Row>
            Coming soon:
          </Row>
          <Row>
            Visual graph of price history over the last week
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
    console.log('The link was clicked.');
  }

  const events = props.events
  const [modalShow, setModalShow] = React.useState(false);
  const [modalEvent, setModalEvent] = React.useState(events[0]);
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
                      <Button block 
                        onClick={handleClick} 
                        variant="secondary"
                        target="_blank"
                        href={event.url}>
                        {getPriceTextFromList(event.last_240_prices)}
                      </Button>
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