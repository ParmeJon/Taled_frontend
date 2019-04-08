import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Trip from './Trip'
// import { getCurrentUser } from '../actions/action'


class ProfileTripIndex extends React.Component {

  // componentDidMount() {
  //   let token = localStorage.token;
  //   if (token) {
  //    this.props.getCurrentUser(token) }
  //    else {
  //      return null
  //    }
  // }



render() {
  console.log(this.props.current_user.trips)
  return (
    <div id="profile-trip-index">
    {!this.props.current_user.trips ?
      <div>
      <h2>You haven't made any trips yet </h2>
      <p> When you post a Trip, it'll show up here</p>
      </div>
      : this.props.current_user.trips.reverse().map(trip => <Trip info={trip} />) }

    </div>
  )
}
}

const mapStateToProps = (state) => {return { current_user: state.current_user, current_trip: state.current_trip}}

// const mapDispatchToProps = (dispatch) => ({
//   getCurrentUser: (token) => dispatch(getCurrentUser(token))
// })

export default connect(mapStateToProps)(withRouter(ProfileTripIndex));
