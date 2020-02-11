import React, { useState, useRef } from 'react';
import {
  Image,
  ListGroup,
  Button,
  ButtonToolbar,
  Container,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
  Overlay,
  Popover
} from 'react-bootstrap'
import { getLocalTime, getLocalDate } from '../utils/time';
import EventPopover from "./EventPopover"

function getPriceTextFromList(price_list) {
  const current_price = price_list.length===0 ? null : price_list[price_list.length-1].price;
  return current_price ? `Starting at $${current_price}` : "Currently sold out"
}

function EventList(props) {
  function handleClick(e) {
    e.stopPropagation();
  }
  function handlePopoverClick(id, e) {
    console.log(popoverId)
    console.log(id)
    setShow(id!==popoverId);
    setPopoverId(id);
    setTarget(e.target);
  }
  const followed_event_ids = props.followed_event_ids
  const events = props.events
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [popoverId, setPopoverId] = useState(null);
  const ref = useRef(null);

  if (events.length>0) {
    return ( <React.Fragment>
      <Overlay
        show={show}
        target={target}
        placement="top"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Popover bottom</Popover.Title>
          <Popover.Content>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Content>
        </Popover>
      </Overlay>
      <ListGroup ref={ref}>
        { events && events.map((event_item)=> {
          const clientZone = Intl.DateTimeFormat().resolvedOptions().timeZone
          const event_date = getLocalDate(event_item.event_time_utc, event_item.timezone)
          const local_date = (clientZone == event_item.timezone) ? event_time :
            getLocalDate(event_item.event_time_utc, clientZone)
          const event_time = getLocalTime(event_item.event_time_utc, event_item.timezone)
          const local_time = (clientZone == event_item.timezone) ? event_time :
            getLocalTime(event_item.event_time_utc, clientZone)
          const isFollowed = followed_event_ids.includes(event_item.id)
          return (<React.Fragment key={event_item.id}>
            <ListGroup.Item 
              className="event-list-item"
              onClick={(e) => handlePopoverClick(event_item.id, e)}
            >
                <Container>
                  <Row>
                    <Col md="4">{
                      event_time==local_time ? (<div>{`${event_date}`}<br/><small>{`${event_time}`}</small></div>) :
                        event_date==local_date ? (<div>{`${event_date}`}<br/><small>{`${event_time}`}</small>/<small>{`${local_time}`}</small></div>) :
                         (<div><small>{`${event_date+"@"+event_time}`}</small><br/><small>{`${local_date+"@"+local_time}`}</small></div>)
                    }</Col>
                    <Col md>
                      <strong>{event_item.name}</strong>
                    </Col>
                    <Col md="auto">
                      <ButtonToolbar>
                        <Button
                          size="sm"
                          onClick={handleClick} 
                          variant="secondary"
                          target="_blank"
                          href={event_item.url}
                        >
                          {getPriceTextFromList(event_item.last_240_prices)}
                        </Button>
                        <Button
                          size="sm"
                          event_id={event_item.id}
                          onClick={(e) => props.handleIndividualClick(props.current_user, followed_event_ids, event_item.id, isFollowed, e)}
                          variant="info"
                        >
                          {isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                      </ButtonToolbar>
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