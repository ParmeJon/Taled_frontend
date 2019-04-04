import React from 'react'
import img from '../images/Taled_cover.svg';
import { connect } from 'react-redux';
import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, Card} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {loginUser} from '../actions/action';
import { withRouter } from "react-router-dom";

class Signup extends React.Component {

  state={
    email: '',
    password: ''
  }

  handleSubmit = (e)=> {
    e.preventDefault()
    this.props.login(this.state)
    this.props.history.push('/profile')
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

render() {
  return (
    <div id="cover">
      <img className="cover" src={img}/>
      <div className="authenticate">
        <Card>
        <Card.Header as="h1">Log In</Card.Header>
        <Card.Body>
        <div className="authenticate-form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label >Email address</Form.Label>
              <Form.Control size="lg" name="email" type="email" placeholder="John@john.com" value={this.state.email} onChange={this.changeHandler}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control size="lg" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
            </Form.Group>

            <Button variant="outline-info" type="submit">
              Submit
            </Button>
          </Form>
          </div>
          </Card.Body>
          </Card>
        </div>
    </div>
  )
}
}

const mapDispatchToProps = dispatch => ({
  login: (userInfo) => dispatch(loginUser(userInfo))
})

export default connect(null, mapDispatchToProps)(withRouter(Signup))
