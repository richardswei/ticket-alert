import React from "react"
// import PropTypes from "prop-types"
import Button from 'react-bootstrap/Button'

function getLocalTime(dateTime) {
  const d = new Date(dateTime);
  return d; 
}
class EventDetails extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.props.current_user){
      window.location.replace("/users/sign_in");
    } else {
      fetch(this.props.event.id+'/add_follow', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // redirect: 'follow', // manual, *follow, error
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": this.props.csrf
        },
        // body: JSON.stringify({'id': event.id})
      })
    }
  }

  render () {
    const event = this.props.event;
    const performer = this.props.performer;
    const startTime = getLocalTime(event.event_time_utc)
    console.log(event);
    console.log(performer);
    console.log(startTime)
    return (
      <div>
        <h2>{event.name}</h2>
        <div>{event.url}</div>
        <div>{startTime.toString()}</div>
        <div>Starting at ${event.price_curr}</div>
        <Button
          variant="info"
          onClick = {this.handleClick}
          >Follow this event!
        </Button>
      </div>
    );
  }
}

export default EventDetails
