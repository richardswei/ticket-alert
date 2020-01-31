import React from "react"
import {ListGroup} from 'react-bootstrap'
function getLocalTime(dateTime) {
  const d = new Date(dateTime);
  return d; 
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
            return (<ListGroup.Item key={event.id}>
              <div>
                <strong>{`${getLocalTime(event.event_time_utc)}`}</strong>
                <div>{event.name}</div>
                <a href={`/performers/${event.performers[0].id}/events/${event.id}`}>
                  {price_list ? `Starting at $${price_list[price_list.length-1].price}` : ''}
                </a>
              </div>
            </ListGroup.Item>)
          })}
        </ListGroup>
      </React.Fragment>)
    } else {
      return ( <React.Fragment>
        <strong>No matching events</strong>
      </React.Fragment> )
    }
  }
}
export default EventList