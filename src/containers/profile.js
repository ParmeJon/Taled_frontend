import React from 'react';
import img from '../images/Taled_cover.svg';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';


class Profile extends React.Component {

render() {
  return (
    <div id="profile">
      <h1>Profile</h1>
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
