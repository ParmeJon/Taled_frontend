import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'


class ProfileHeader extends React.Component {




render() {
  return (
    <div id="profile-header">
      <div className="profile-pic">
      <Image alt="profile image" src={this.props.current_user && this.props.current_user.profile_image ? `${this.props.current_user.profile_image.image_url}` : "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"} thumbnail />
      </div>

      <div className="profile-info">
        <div>
        <h1>{ this.props.current_user.first_name ? `${this.props.current_user.first_name} ${this.props.current_user.last_name}` : "Loading"}</h1>
          {this.props.current_user.active ? <p className="active-mark">Available</p> : <p className="busy-mark">Busy</p>}
          {this.props.current_user.email ? <p className="profile-email">{this.props.current_user.email}</p> : null}
        </div>
        <div className="profile-buttons">
        <Button variant="outline-info" block size="lg" onClick={this.props.editModalShow}>Edit Profile</Button>
        <Button variant="outline-success" block size="lg" onClick={this.props.newTripModalShow}>New Trip</Button>
        </div>
      </div>

      <hr />
    </div>
  )
}
}

const mapStateToProps = (state) => {return { current_user: state.current_user}}

// const mapDispatchToProps = (dispatch) => ({
//   editProfile: ()
// })

export default connect(mapStateToProps)(withRouter(ProfileHeader));
