import React, { Component } from 'react';

// import PropTypes from "prop-types"
import {Button,Image} from 'react-bootstrap'

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

class EventDetails extends Component {
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
    const price_list = event.last_240_prices
    const current_price = price_list.length===0 ? null : price_list.pop();
    const clientZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const event_date = getLocalDate(event.event_time_utc, event.timezone)
    const local_date = (clientZone == event.timezone) ? event_time : getLocalDate(event.event_time_utc, clientZone)
    const event_time = getLocalTime(event.event_time_utc, event.timezone)
    const local_time = (clientZone == event.timezone) ? event_time : getLocalTime(event.event_time_utc, clientZone)
    return (
      <div>
        <h3>{event.name}</h3>

        <div>
          {
            event_time==local_time ? (<div>{`${event_date}`}<br/><small>{`${event_time}`}</small></div>) :
              event_date==local_date ? (<div>{`${event_date}`}<br/><small>{`${event_time}`}</small><br/><small>{`${local_time}`}</small></div>) :
               (<div><small>{`${event_date+"@"+event_time}`}</small><br/><small>{`${local_date+"@"+local_time}`}</small></div>)
          }
        </div>
        <div>
          {this.props.performer_slugs.map((item)=>{
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
              {current_price ? `Starting at $${current_price.price}` : "Currently sold out"}
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
