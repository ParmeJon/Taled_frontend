import React from 'react';
import { withRouter } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/action'



class Menu extends React.Component {

  state = {
    query: ''
  }

  handleInputChange = (e) => {
    this.setState({
      query: e.target.value
    },()=>{
      console.log(this.state)
      this.props.setSearchTerm(this.state.query)
      this.props.history.push(`/search/${this.state.query}`)

    })
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.props.logoutUser()
    this.props.history.push('/signup')
  }

  componentDidMount() {
    let token = localStorage.token;
    if (token) {
     this.props.getCurrentUser(token) }
     else {
       return null
     }
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.setSearchTerm(this.state.query)
    this.props.history.push(`/search/${this.state.query}`)
  }

  render() {
    return (
      <Navbar fixed="top" bg="transparent" expand="lg">
        <Navbar.Brand onClick={()=>this.props.history.push('/')}>TD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">

            {localStorage.token && this.props.current_user.first_name ? <Nav.Link onClick={()=>this.props.history.push('/friends')}>Friends</Nav.Link> : null }
            {this.props.current_user && this.props.current_user.first_name ? null : <Nav.Link onClick={()=>this.props.history.push('/signup')}>Signup</Nav.Link>}
            {localStorage.token ? <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link> : <Nav.Link onClick={()=>this.props.history.push('/login')}>Login</Nav.Link>}

            {localStorage.token && this.props.current_user.first_name ?
              <NavDropdown alignRight className="mr-auto" title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>this.props.history.push('/profile')}>{`${this.props.current_user.first_name}'s' page`}</NavDropdown.Item>
              <NavDropdown.Item >Current Trip</NavDropdown.Item>
              <NavDropdown.Item >New Post</NavDropdown.Item>
              <NavDropdown.Item >New Trip</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >Friends</NavDropdown.Item>
            </NavDropdown> : null }
            <Form inline onSubmit={this.handleSearch}>
              <FormControl type="text" placeholder="Search Users" className="mr-sm-2" onChange={this.handleInputChange}/>
              <Button type="submit" variant="outline-info" className="fas fa-search"></Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => ({ current_user: state.current_user})
const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: (token) => dispatch(getCurrentUser(token)),
  logoutUser: () => dispatch(({type: "LOG_OUT"})),
  setSearchTerm: (term) => dispatch(({type: "SET_TERM", payload: term}))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu));
