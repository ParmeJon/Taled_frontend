import React from 'react';
import img from '../images/Taled_cover.svg';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import ProfileHeader from '../components/ProfileHeader'
import EditProfileModal from '../components/EditProfileModal'
import NewTripModal from '../components/NewTripModal'
import ProfileTripIndex from '../components/ProfileTripIndex'



class Profile extends React.Component {

  state = {
    editModalShow: false,
    newTripModalShow: false
  }

  editModalShow = () => {this.setState({editModalShow: true}) }
  newTripModalShow = () => {this.setState({newTripModalShow: true}) }


render() {
  let modalClose = () => this.setState({ editModalShow: false });
  let newTripModalClose = () => this.setState({ newTripModalShow: false});

  return (
    <div id="profile">
      <div className="align-header">
        <ProfileHeader editModalShow={this.editModalShow} newTripModalShow={this.newTripModalShow}/>
      </div>

      <EditProfileModal
       show={this.state.editModalShow}
       onHide={modalClose}
     />
      <NewTripModal
      show={this.state.newTripModalShow}
      onHide={newTripModalClose}
      />

      <div className="align-trip-index">
        <ProfileTripIndex />
      </div>
    </div>
  )
}
}

const mapStateToProps = (state) => {return { current_user: state.current_user, current_trip: state.current_trip, all_trips: state.all_trips}}

// const mapDispatchToProps = dispatch => ({
//   editProfile: (userInfo) => dispatch(createUser(userInfo)),
//   newTrip: ()
//
// })

export default connect(mapStateToProps)(withRouter(Profile));
