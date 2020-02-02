import React from "react"
// import PropTypes from "prop-types"
import LeagueDropdownList from './LeagueDropdownList'
import CustomDropdown from './CustomDropdown'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class MainNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    window.location.href = '/search?q='+this.state.value
    event.preventDefault();
  }

  render () {
    const all_performers = this.props.performers
    return (
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
        <Navbar.Brand href="/">
          <div className="application-title">TicketAlert</div>
          <small>powered by SeatGeek</small>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            
            <Nav.Item>
              <CustomDropdown title="MLB">
                <LeagueDropdownList 
                  taxonomy="mlb"
                  performers={all_performers.filter((team)=> {return team["taxonomy"]==="mlb"} )}
                />
                </CustomDropdown>
              </Nav.Item>

            <Nav.Item>
              <CustomDropdown title="NBA">
                <LeagueDropdownList 
                  taxonomy="nba"
                  performers={all_performers.filter((team)=> {return team["taxonomy"]==="nba"} )}
                />
                </CustomDropdown>
              </Nav.Item>

            <Nav.Item>
              <CustomDropdown title="NFL">
                <LeagueDropdownList 
                  taxonomy="nfl"
                  performers={all_performers.filter((team)=> {return team["taxonomy"]==="nfl"} )}
                />
               </CustomDropdown>
             </Nav.Item>
            
            <Nav.Item>
              <CustomDropdown title="NHL">
                <LeagueDropdownList 
                  taxonomy="nhl"
                  performers={all_performers.filter((team)=> {return team["taxonomy"]==="nhl"} )}
                />
              </CustomDropdown>
            </Nav.Item>

          </Nav>
          <Nav>
            <Form onSubmit={this.handleSubmit} inline>
              <FormControl onChange={this.handleChange} type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
          </Nav>
          <Nav>
            {this.props.userSignedIn ? <NavDropdown alignRight title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/users/my_profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/users/sign_out" data-method="delete">Sign Out</NavDropdown.Item>
            </NavDropdown> : <Nav.Link href="/users/sign_in">Sign In</Nav.Link> }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MainNavbar
