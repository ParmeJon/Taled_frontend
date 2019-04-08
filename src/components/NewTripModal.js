import React from 'react';
import {Row, Col, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { postCreateTrip } from '../actions/action'


class NewTripModal extends React.Component {


  state = {
    title: '',
    user_id: ''
  }

  componentDidUpdate(prevProps) {
    if (this.state.user_id !== this.props.current_user.id) {
      this.setState({
        user_id: this.props.current_user.id
      })
    }
  }


  submitHandler = (e) => {
    e.preventDefault()
    this.props.createTrip(this.state)
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
console.log(this.state)

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Trip
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.submitHandler}>
        <Form.Group controlId="formGridEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" onChange={this.onChangeHandler}/>
        </Form.Group>

{/*        <Form.Group controlId="formGridAddress2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"/>
        </Form.Group> */}


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
  createTrip: (tripInfo) => dispatch(postCreateTrip(tripInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTripModal);
