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

  handleLogout = () => {
    localStorage.removeItem("token")
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


  render() {
    console.log(this.props.current_user)
    return (
      <Navbar fixed="top" bg="transparent" expand="lg">
        <Navbar.Brand onClick={()=>this.props.history.push('/')}>TD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={()=>this.props.history.push('/signup')}>Signup</Nav.Link>
            {localStorage.token ? <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link> : <Nav.Link onClick={()=>this.props.history.push('/login')}>Login</Nav.Link>}
            {localStorage.token && this.props.current_user.first_name ?
              <NavDropdown alignRight className="mr-auto" title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>this.props.history.push('/profile')}>{`${this.props.current_user.first_name}'s' page`}</NavDropdown.Item>
              <NavDropdown.Item >New Post</NavDropdown.Item>
              <NavDropdown.Item >Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Friends</NavDropdown.Item>
            </NavDropdown> : null }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => ({ current_user: state.current_user})
const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: (token) => dispatch(getCurrentUser(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu));
