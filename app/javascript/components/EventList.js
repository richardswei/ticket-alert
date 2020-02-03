import React from "react"
import {ListGroup,Button, Container, Row, Col} from 'react-bootstrap'
function getLocalDate(dateTime) {
  const d = new Date(dateTime);
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
  return d.toLocaleDateString(undefined, options); 
}
function getLocalTime(dateTime) {
  const d = new Date(dateTime);
  const options = {hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
  return d.toLocaleTimeString(undefined, options); 
}


class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const events = this.props.events
    console.log(events)
    if (events.length>0) {
      return ( <React.Fragment>
        <ListGroup>
          { events && events.map((event)=> {
            const price_list = event.last_240_prices
            const current_price = price_list[price_list.length-1].price;

            return (<ListGroup.Item key={event.id}>
              <Container>
                <Row>
                  <Col md="3">
                    <div>{`${getLocalDate(event.event_time_utc)}`}</div>
                    <small>{`${getLocalTime(event.event_time_utc)}`}</small>
                  </Col>
                  <Col md>
                    <div>{event.name}</div>
                  </Col>
                  <Col md="3">
                    <Button variant="secondary" href={`/performers/${event.performers[0].id}/events/${event.id}`}>
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