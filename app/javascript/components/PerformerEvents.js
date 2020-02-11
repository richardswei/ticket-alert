import React, { Component } from 'react';
// import PropTypes from "prop-types"
import EventList from './EventList'
import TeamHeader from './TeamHeader'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Container, Row, Col, ButtonToolbar, Button,Image} from 'react-bootstrap'

function getLocalTime(dateTime) {
  const d = new Date(dateTime);
  return d; 
}

function addIndividualFollow(performer_id, event_id, csrf_token) {
  fetch(`${performer_id}/events/${event_id}/add_individual_follow`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // redirect: 'follow', // manual, *follow, error
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf_token
    },
    // body: JSON.stringify({'id': event.id})
  })
}

function deleteIndividualFollow(performer_id, event_id, csrf_token) {
  fetch(`${performer_id}/events/${event_id}/delete_individual_follow`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    // redirect: 'follow', // manual, *follow, error
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf_token
    },
    // body: JSON.stringify({'id': event.id})
  })
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
    this.handleTeamFollowClick = this.handleTeamFollowClick.bind(this);
    this.handleIndividualFollowClick = this.handleIndividualFollowClick.bind(this);
    this.state = {
      homeOnly: true,
      all_events: this.props.events,
      home_events: this.props.events.filter((event) => event.home_team==this.props.performer.slug),
      all_home_events_followed: this.props.all_home_events_followed,
      followed_event_ids: this.props.followed_event_ids
    };
  }

  handleTeamFollowClick() {
    if (!this.props.current_user){
      window.location.replace("/users/sign_in");
    } else {
      if (this.state.all_home_events_followed) {
        deleteTeamFollow(this.props.performer.id, this.props.csrf);
        this.setState({all_home_events_followed: !this.state.all_home_events_followed})
        this.setState({followed_event_ids: []})
      } else {
        const game_ids=this.state.home_events.map((x)=>x.id)
        addTeamFollow(this.props.performer.id, this.props.csrf);
        this.setState({all_home_events_followed: !this.state.all_home_events_followed})
        this.setState({followed_event_ids: game_ids})
      }
    }
  }
  handleIndividualFollowClick(followed_event_ids, event_id, isFollowed, e) {
    console.log(e);
    console.log(event_id);
    e.stopPropagation();
    if (!this.props.current_user){
      window.location.replace("/users/sign_in");
    } else {
      if (isFollowed) {
        deleteIndividualFollow(this.props.performer.id, event_id, this.props.csrf);
        this.setState({followed_event_ids: followed_event_ids.filter(x=>x!==event_id)})
      } else {
        addIndividualFollow(this.props.performer.id, event_id, this.props.csrf);
        this.setState({followed_event_ids: [event_id, ...followed_event_ids]})
      }
    }
  }

  render() {
    const performer = this.props.performer
    const events = this.state.homeOnly ? this.state.home_events : this.state.all_events
    const followOn = this.state.all_home_events_followed
    return (
      <React.Fragment>
        <TeamHeader
          colors= {performer.colors}
          header= {performer.name}
          slug= {performer.slug}
        ></TeamHeader>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={5}>
              <BootstrapSwitchButton
                checked={this.state.homeOnly}
                onlabel='Home Events'
                offlabel='All Events'
                offstyle='warning'
                onChange={(checked) => {
                  this.setState({ homeOnly: checked })
                }}
              />
            </Col>
            <Col xs={12} md={5}>
              <Button block
                variant={followOn ? "outline-danger" : "outline-primary" } 
                onClick = {this.handleTeamFollowClick}
              >
                {followOn ?
                  "Unfollow ALL events for this team" :
                    "Follow all home events!"}
              </Button>
            </Col>
          </Row>
        </Container>
        <EventList 
          current_user={this.props.current_user}
          events={events}
          followed_event_ids={this.state.followed_event_ids}
          handleIndividualClick={this.handleIndividualFollowClick}/>
      </React.Fragment>
    );
  }
}


export default PerformerEvents

