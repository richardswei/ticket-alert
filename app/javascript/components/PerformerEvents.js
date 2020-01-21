import React from "react"
// import PropTypes from "prop-types"
import TeamHeader from './TeamHeader'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

function getLocalTime(dateTime) {
  const d = new Date(dateTime);
  return d; 
}

class PerformerEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeOnly: true,
    };
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
            width={100}
            onlabel='Home Games'
            offlabel='All Games'
            onChange={(checked) => {
                this.setState({ homeOnly: checked })
            }}
        />
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
      <a href={`${props.performerId}/events/${props.id}`}>Starting at ${props.price}</a>
    </div>
  )
}


export default PerformerEvents

