import React from 'react';
import {Row, Col, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import {updateCurrentUser} from '../actions/action'

class MyVerticallyCenteredModal extends React.Component {


  state = {
    email: '',
    active: true,
    first_name: '',
    last_name: ''
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.updateCurrentUser(this.props.current_user.id, this.state)
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.submitHandler}>
        <Form.Group controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={this.onChangeHandler} value={this.state.email} placeholder={this.props.current_user.email}/>
        </Form.Group>

{/*        <Form.Group controlId="formGridAddress2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"/>
        </Form.Group> */}

        <Form.Row>
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="first_name" onChange={this.onChangeHandler} value={this.state.first_name} placeholder={this.props.current_user.first_name}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="last_name" onChange={this.onChangeHandler} value={this.state.last_name} placeholder={this.props.current_user.last_name}/>
        </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" name="active" onChange={this.onChangeHandler}>
              <option value={true}>Available</option>
              <option value={false}>Busy</option>
            </Form.Control>
          </Form.Group>

        </Form.Row>

        <Modal.Footer>
        <Button type="submit" variant="outline-info">Save Changes</Button>
        <Button variant="outline-secondary" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
        </Form>
        </Modal.Body>

      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({ current_user: state.current_user})

const mapDispatchToProps = (dispatch) => ({
  updateCurrentUser: (user_id, userInfo) => dispatch(updateCurrentUser(user_id, userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyVerticallyCenteredModal);
