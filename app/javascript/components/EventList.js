import React from "react"
import {ListGroup,Button, Container, Row, Col} from 'react-bootstrap'
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


class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const events = this.props.events
    if (events.length>0) {
      return ( <React.Fragment>
        <ListGroup>
          { events && events.map((event)=> {
            const price_list = event.last_240_prices
            const current_price = price_list.length===0 ? null : price_list[price_list.length-1].price;
            const clientZone = Intl.DateTimeFormat().resolvedOptions().timeZone
            const event_date = getLocalDate(event.event_time_utc, event.timezone)
            const local_date = (clientZone == event.timezone) ? event_time : getLocalDate(event.event_time_utc, clientZone)
            const event_time = getLocalTime(event.event_time_utc, event.timezone)
            const local_time = (clientZone == event.timezone) ? event_time : getLocalTime(event.event_time_utc, clientZone)
            return (<ListGroup.Item key={event.id}>
              <Container>
                <Row>
                  <Col md="3">
                    {
                      event_time==local_time ? (<div>{`${event_date}`}<br/><small>{`${event_time}`}</small></div>) :
                        event_date==local_date ? (<div>{`${event_date}`}<br/><small>{`${event_time}`}</small><br/><small>{`${local_time}`}</small></div>) :
                         (<div><small>{`${event_date+"@"+event_time}`}</small><br/><small>{`${local_date+"@"+local_time}`}</small></div>)
                    }
                  </Col>
                  <Col md>
                    <div>{event.name}</div>
                  </Col>
                  <Col md="3">
                    <Button block variant="secondary" href={`/performers/${event.performers[0].id}/events/${event.id}`}>
                      {current_price ? `Starting at $${current_price}` : "Currently sold out"}
                    </Button>
                  </Col>
                </Row>
              </Container>
            </ListGroup.Item>)
          })}
        </ListGroup>
      </React.Fragment>)
    } else {
      return ( <React.Fragment>
        <div>No matching events</div>
      </React.Fragment> )
    }
  }
}
export default EventList