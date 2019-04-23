import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { Card, Button } from 'react-bootstrap'
import {sendFriendRequest} from '../actions/action'
import { App } from 'react-actioncable-provider'
import NewRequestfeedForm from './NewRequestfeedForm'
import LoadUserConcernMeter from './LoadUserConcernMeter'




class LoadFriendsCard extends React.Component {

  state = {
    title: "sent Request"
  }

  render() {
    console.log(this.props)
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
          {this.props.info.trips[this.props.info.trips.length - 1] ? <LoadUserConcernMeter info={this.props.info}/> : null}
        </Card.Body>
      </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user
})

const mapDispatchToProps = (dispatch) => ({
  sendFriendRequest: (friend_id) => dispatch(sendFriendRequest(friend_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoadFriendsCard));
