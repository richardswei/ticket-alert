import React from "react"
// import PropTypes from "prop-types"
import TeamHeader from './TeamHeader'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {Button,Image} from 'react-bootstrap'

function getLocalTime(dateTime) {
  const d = new Date(dateTime);
  return d; 
}

function addTeamFollow(performer_id, csrf_token) {
  fetch(performer_id+'/add_team_follow', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // redirect: 'follow', // manual, *follow, error
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf_token
    },
    // body: JSON.stringify({'id': event.id})
  })
}

function deleteTeamFollow(performer_id, csrf_token) {
  fetch(performer_id+'/delete_team_follow', {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    // redirect: 'follow', // manual, *follow, error
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf_token
    },
    // body: JSON.stringify({'id': event.id})
  })
}

class PerformerEvents extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      homeOnly: true,
      all_home_events_followed: this.props.all_home_events_followed,
    };
  }

  handleClick() {
    if (!this.props.current_user){
      window.location.replace("/users/sign_in");
    } else {
      if (this.state.all_home_events_followed) {
        deleteTeamFollow(this.props.performer.id, this.props.csrf);
        this.setState({all_home_events_followed: !this.state.all_home_events_followed})
      } else {
        addTeamFollow(this.props.performer.id, this.props.csrf);
        this.setState({all_home_events_followed: !this.state.all_home_events_followed})
      }
    }
  }

  render () {
    const performer = this.props.performer
    const events = this.props.events
    return (
      <React.Fragment>
        <TeamHeader
          header= {`Upcoming Events for the ${performer.name}`}
          slug= {performer.slug}
        ></TeamHeader>
        <BootstrapSwitchButton
            checked={this.state.homeOnly}
            width={200}
            onlabel='Home Events'
            offlabel='All Events'
            onChange={(checked) => {
                this.setState({ homeOnly: checked })
            }}
        />
        <Button variant="info" onClick = {this.handleClick}>
          {this.state.all_home_events_followed ?
            "Unfollow all events" :
              "Follow all home events!"}
        </Button>
        { 
          events.map((event) => {
            if (event.home_team == performer.slug || !this.state.homeOnly) {
              return <EventRow
                name={event.name}
                id={event.id}
                performerId={performer.id}
                key={event.id}
                price={event.price_curr}
                time={event.event_time_utc}
                homeTeam={event.home_team}
                venue={event.venue}
              />
            }
          })
        }
      </React.Fragment>
    );
  }
}

const EventRow = (props) => {
  return ( <div>
      <strong>{`${getLocalTime(props.time)}`}</strong>
      <div>{props.name}</div>
      <a href={`/performers/${props.performerId}/events/${props.id}`}>Starting at ${props.price}</a>
    </div>
  )
}


export default PerformerEvents

