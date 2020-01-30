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
    return (
      <React.Fragment>
        <ListGroup>
          { events.map((event)=> (
            <ListGroup.Item>
            {console.log(event)}
              <div>
                <strong>{`${getLocalTime(event.event_time_utc)}`}</strong>
                <div>{event.name}</div>
                <a href={`/performers/${event.performers[0].id}/events/${event.id}`}>Starting at ${event.price_curr}</a>
              </div>
            </ListGroup.Item>
            ))
          }
        </ListGroup>
      </React.Fragment>
    )
  }
}
export default EventList