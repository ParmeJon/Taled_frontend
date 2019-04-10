import React from 'react';
import {Row, Col, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { postCreatePost } from '../actions/action'


class NewPostModal extends React.Component {


  state = {
    title: '',
    content: '',
    geolocation: '',
    trip_id: '',
    post_image: null
  }

  componentDidUpdate(prevProps) {
    if (this.state.trip_id !== this.props.selected_trip.id) {
      this.setState({
        trip_id: this.props.selected_trip.id
      })
    }
  }


  submitHandler = (e) => {
    e.preventDefault()
    let newInfo = this.state
    if (newInfo.post_image === null) {
      delete newInfo.post_image
    }
    this.props.createPost(newInfo)
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeFile = (e) => {
    this.setState({
      post_image: e.target.files[0]
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
            New Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.submitHandler}>

        <Form.Group controlId="formGridTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" onChange={this.onChangeHandler}/>
        </Form.Group>

        <Form.Group controlId="formGridUpload">
        <Form.Label>Attach a Photo!</Form.Label>
        <Form.Control type="file" name="post_image" onChange={this.onChangeFile} />
        </Form.Group>

        <Form.Group controlId="formGridContent">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" name="content" onChange={this.onChangeHandler}/>
        </Form.Group>

        <Form.Group controlId="formGridContent">
          <Form.Label>Location</Form.Label>
          <Form.Control as="textarea" name="geolocation" onChange={this.onChangeHandler}/>
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

const mapStateToProps = (state) => ({ selected_trip: state.selected_trip})

const mapDispatchToProps = (dispatch) => ({
  createPost: (postInfo) => dispatch(postCreatePost(postInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPostModal);
