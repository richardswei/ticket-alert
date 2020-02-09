import React, { Component } from 'react';
// import PropTypes from "prop-types"
import EventList from './EventList'
import TeamHeader from './TeamHeader'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {ButtonToolbar, Button,Image} from 'react-bootstrap'

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

class PerformerEvents extends Component {
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

  render() {
    const performer = this.props.performer
    const all_events = this.props.events
    console.log(all_events)
    const events = this.state.homeOnly ? 
      all_events.filter((event) => event.home_team==performer.slug) :
        all_events
    const followOn = this.state.all_home_events_followed
    return (
      <React.Fragment>
        <TeamHeader
          colors= {performer.colors}
          header= {performer.name}
          slug= {performer.slug}
        ></TeamHeader>
        <BootstrapSwitchButton
            className="home-events-btn"
            checked={this.state.homeOnly}
            width={200}
            onlabel='Home Events'
            offlabel='All Events'
            offstyle='warning'
            onChange={(checked) => {
              this.setState({ homeOnly: checked })
            }}
        />
        <Button 
          className="follow-btn" 
          variant={followOn ? "outline-danger" : "outline-primary" } 
          onClick = {this.handleClick}
        >
          {followOn ?
            "Unfollow ALL events for this team" :
              "Follow all home events!"}
        </Button>
        <EventList events={events}/>
      </React.Fragment>
    );
  }
}


export default PerformerEvents

