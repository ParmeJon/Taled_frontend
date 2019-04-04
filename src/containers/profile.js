import React from 'react';
import img from '../images/Taled_cover.svg';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import ProfileHeader from '../components/ProfileHeader'
import MyVerticallyCenteredModal from '../components/EditProfileModal'



class Profile extends React.Component {

  state = {
    modalShow: false
  }

  modalShow = () => {this.setState({modalShow: true}) }

render() {
  let modalClose = () => this.setState({ modalShow: false });

  return (
    <div id="profile">
      <ProfileHeader modalShow={this.modalShow}/>

      <MyVerticallyCenteredModal
       show={this.state.modalShow}
       onHide={modalClose}
     />
    </div>
  )
}
}

const mapStateToProps = (state) => {return { current_user: state.current_user}}

// const mapDispatchToProps = dispatch => ({
//   editProfile: (userInfo) => dispatch(createUser(userInfo)),
//   newTrip: ()
//
// })

export default connect(mapStateToProps)(withRouter(Profile));
