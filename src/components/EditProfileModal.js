import React from 'react';
import {Row, Col, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import {updateThisUser} from '../actions/action'

class EditProfileModal extends React.Component {


  state = {
    email: '',
    active: true,
    first_name: '',
    last_name: '',
    profile_image: null,
    update_state: true
  }

  componentDidUpdate(prevProps) {
    if (this.state.update_state === true) {
      this.setState({
        email: this.props.current_user.email,
        active: this.props.current_user.active,
        first_name: this.props.current_user.first_name,
        last_name: this.props.current_user.last_name,
        update_state: false
      })
    }
  }

  submitHandler = (e) => {
    e.preventDefault()
    let newInfo = this.state
    delete newInfo.update_state
    if (newInfo.profile_image === null) {
      delete newInfo.profile_image
    }
    this.props.updateUser(this.props.current_user.id, newInfo)
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeFile = (e) => {
    this.setState({
      profile_image: e.target.files[0]
    })

  }

  render() {
    console.log(this.props.current_user.email)

    let selected = (this.props.current_user.active) ? 'selected' : 'false';


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
          <Form.Control type="email" name="email" onChange={this.onChangeHandler} value={this.state.email} />
        </Form.Group>

{/*        <Form.Group controlId="formGridAddress2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"/>
        </Form.Group> */}

        <Form.Group controlId="formGridUpload">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control type="file" name="profile_image" onChange={this.onChangeFile} />
        </Form.Group>

        <Form.Row>
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="first_name" onChange={this.onChangeHandler} value={this.state.first_name} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="last_name" onChange={this.onChangeHandler} value={this.state.last_name} />
        </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" name="active" value={this.state.active} onChange={this.onChangeHandler}>
              <option value={true} >Available</option>
              <option value={false} >Busy</option>
            </Form.Control>
          </Form.Group>

        </Form.Row>

        <Modal.Footer>
        <Button type="submit" variant="outline-info" onClick={this.props.onHide}>Save Changes</Button>
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
  updateUser: (user_id, userInfo) => dispatch(updateThisUser(user_id, userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);
