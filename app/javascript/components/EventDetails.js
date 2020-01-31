import React from "react"
// import PropTypes from "prop-types"
import {Button,Image} from 'react-bootstrap'

function getLocalTime(dateTime) {
  const d = new Date(dateTime);
  return d; 
}

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

class EventDetails extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.state = {event_followed : this.props.event_followed}
  }

  handleClick() {
    if (!this.props.current_user){
      window.location.replace("/users/sign_in");
    } else {
      if (this.state.event_followed) {
        deleteFollow(this.props.event.id, this.props.csrf);
        this.setState({event_followed: !this.state.event_followed})
      } else {
        addFollow(this.props.event.id, this.props.csrf);
        this.setState({event_followed: !this.state.event_followed})
      }
    }
  }

  render() {
    const event = this.props.event;
    const startTime = getLocalTime(event.event_time_utc)
    return (
      <div>
        <h3>{event.name}</h3>
        <div>{startTime.toString()}</div>
        <div>
          {this.props.performer_slugs.map((item)=>{
            console.log(`/logos/${item}.svg`)
            return <Image 
              key={`logo-${item}`} 
              className="team-logo" 
              src={`/logos/${item}.svg`}>
            </Image>
          })}
        </div>
        <div>
          <a href={event.url} target="_blank">
            <h4>
              Starting at ${event.last_240_prices.pop().price}
            </h4>
          </a>
        </div>
        <Button variant="info" onClick = {this.handleClick}>
          {this.state.event_followed ?
            "Stop following this event" :
              "Follow this event!"}
        </Button>
      </div>
    );
  }
}

export default EventDetails
