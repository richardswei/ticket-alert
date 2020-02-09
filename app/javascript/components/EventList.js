import React, { useState } from 'react';
import {ListGroup,Button, Container, Row, Col, Modal} from 'react-bootstrap'
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



function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


function EventList(props) {
  function handleClick(e) {
    e.stopPropagation();
    console.log('The link was clicked.');
  }

  const [modalShow, setModalShow] = React.useState(false);
  const events = props.events
  if (events.length>0) {
    return ( <React.Fragment>
      <MyVerticallyCenteredModal
         show={modalShow}
         onHide={() => setModalShow(false)}
       />
      <ListGroup>
        { events && events.map((event)=> {
          const price_list = event.last_240_prices
          const current_price = price_list.length===0 ? null : price_list[price_list.length-1].price;
          const clientZone = Intl.DateTimeFormat().resolvedOptions().timeZone
          const event_date = getLocalDate(event.event_time_utc, event.timezone)
          const local_date = (clientZone == event.timezone) ? event_time :
            getLocalDate(event.event_time_utc, clientZone)
          const event_time = getLocalTime(event.event_time_utc, event.timezone)
          const local_time = (clientZone == event.timezone) ? event_time :
            getLocalTime(event.event_time_utc, clientZone)
          return (<React.Fragment>
            <ListGroup.Item onClick={() => setModalShow(true)} key={event.id}>
              <Container>
                <Row>
                  <Col md="4">
                    {
                      event_time==local_time ? (<div>{`${event_date}`}<br/><small>{`${event_time}`}</small></div>) :
                        event_date==local_date ? (<div>{`${event_date}`}<br/><small>{`${event_time}`}</small>/<small>{`${local_time}`}</small></div>) :
                         (<div><small>{`${event_date+"@"+event_time}`}</small><br/><small>{`${local_date+"@"+local_time}`}</small></div>)
                    }
                  </Col>
                  <Col md>
                    <div>{event.name}</div>
                  </Col>
                  <Col md="3">
                    <Button block onClick={handleClick} variant="secondary" href={`/performers/${event.performers[0].id}/events/${event.id}`}>
                      {current_price ? `Starting at $${current_price}` : "Currently sold out"}
                    </Button>
                  </Col>
                </Row>
              </Container>
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