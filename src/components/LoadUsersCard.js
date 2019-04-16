import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { Card, Button } from 'react-bootstrap'
import {sendFriendRequest} from '../actions/action'
import { App } from 'react-actioncable-provider'



class LoadUsersCard extends React.Component {

  state = {
    body: ""
  }


  friendHandler() {
    App.cable.subscriptions.subscriptions[0].speak({ request: this.state.body });
    this.setState({ body: "" });
  }

  render() {
    return(
      <div className="user-cards">
      <Card style={{ width: '20rem', height: '30rem'}}>
        <div className="user-image-div">
        <Card.Img style={{ objectFit: 'contain', width: "100%", height: "100%", overflow: 'hidden'}} variant="null" src={this.props.info.profile_image && this.props.info.profile_image.image_url ? this.props.info.profile_image.image_url : "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"} />
        </div>
        <Card.Body>
          <Card.Title>{`${this.props.info.first_name} ${this.props.info.last_name}`}</Card.Title>
          <Card.Text>
            {this.props.info.email}
          </Card.Text>
          <Button variant="info" onClick={this.friendHandler}>Send Friend Request</Button>
        </Card.Body>
      </Card>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendFriendRequest: (user_id, friend_id) => dispatch(sendFriendRequest(user_id, friend_id))
})

export default connect(null, mapDispatchToProps)(withRouter(LoadUsersCard));
