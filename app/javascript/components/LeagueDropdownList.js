import React, { Component } from 'react';
// import PropTypes from "prop-types"
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'


class LeagueDropdownList extends Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' }
  }
  handleImageClick(id) {
    window.location.href = '/performers/'+id
  }

  render () {
    const performers = this.props.performers
    const league = this.props.taxonomy
    const leagueDivisions = getLeague(league);
    const conferenceNames = Object.keys(leagueDivisions)
    const performersOrganized = getPerformersInTree(leagueDivisions, performers)
    const divisions = Object.values(performersOrganized).map((conf)=> {
      return Object.values(conf)
    })
   
    return (
      <Container>
        <Row>
          {conferenceNames.map((conf, confIdx)=>{
            return (
              <Col key={conf} sm={6}>
                <strong className="conference-title">{conf}</strong>
                <Row>
                  {divisions[confIdx].map((division)=>{
                    return (<Col key={division.name} sm={12/(divisions[confIdx].length)}>
                      <Row>
                        <div className="division-title">{division.name}</div>
                      </Row>
                        {division.teams.map((team)=> {
                          return (<Row key={team.slug}>
                            <Image
                              as={Button}
                              className="btn-outline-secondary team-logo-md" 
                              src={`/logos/${team.slug}.svg`}
                              onClick={() => this.handleImageClick(team.id)}
                            />
                          </Row>)
                        })}
                      </Col>)
                  })}
                </Row>
              </Col>
            )
          })}
        </Row>
      </Container>
    );
  }
}

export default LeagueDropdownList

function getPerformersInTree(leagueDivisions, performers) {
  performers.forEach((performer)=> {
    const conference = performer["division"][0]
    const division = performer["division"][1]
    leagueDivisions[conference][division].teams.push(performer)
  })
  return leagueDivisions
}

function getLeague(league) {
  const divisionDictionary = {
    "mlb": {
      "National League": {
        "National League West": {
          "name": "West",
          "teams":[]
        },
        "National League Central": {
          "name": "Central",
          "teams":[]
        },
        "National League East": {
          "name": "East",
          "teams":[]
        }
      },
      "American League": {
        "American League West": {
          "name": "West",
          "teams":[]
        },
        "American League Central": {
          "name": "Central",
          "teams":[]
        },
        "American League East": {
          "name": "East",
          "teams":[]
        },
      }
    },
    "nba": {
      "Western Conference": {
        "Western - Pacific": {
          "name": "Pacific",
          "teams":[]
        },
        "Western - Northwest": {
          "name": "Northwest",
          "teams":[]
        },
        "Western - Southwest": {
          "name": "Southwest",
          "teams":[]
        },
      },
      "Eastern Conference": {
        "Eastern - Central": {
          "name": "Central",
          "teams":[]
        },
        "Eastern - Southeast": {
          "name": "Southeast",
          "teams":[]
        },
        "Eastern - Atlantic": {
          "name": "Atlantic",
          "teams":[]
        },
      }
    },
    "nfl": {
      NFC: {
        "NFC West": {
          "name": "West",
          "teams":[]
        },
        "NFC North": {
          "name": "North",
          "teams":[]
        },
        "NFC South": {
          "name": "South",
          "teams":[]
        },
        "NFC East": {
          "name": "East",
          "teams":[]
        },
      },
      AFC: {
        "AFC West": {
          "name": "West",
          "teams":[]
        },
        "AFC North": {
          "name": "North",
          "teams":[]
        },
        "AFC South": {
          "name": "South",
          "teams":[]
        },
        "AFC East": {
          "name": "East",
          "teams":[]
        },
      },
    },
    "nhl": {
      "Western Conference" : {
        "Western - Pacific": {
          "name": "Pacific",
          "teams":[]
        },
        "Western - Central": {
          "name": "Central",
          "teams":[]
        },
      },
      "Eastern Conference": {
        "Eastern - Atlantic": {
          "name": "Atlantic",
          "teams":[]
        },
        "Eastern - Metropolitan": {
          "name": "Metropolitan",
          "teams":[]
        },
      }
    },
  };
  return divisionDictionary[league];
}