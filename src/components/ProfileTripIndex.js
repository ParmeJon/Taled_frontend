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
  console.log("Profile Trip Index iterating",this.props.current_user)
  return (
    <div id="profile-trip-index">
    {!this.props.current_user.trips || this.props.current_user.trips < 1 ?
      <div>
      <h2>You haven't made any trips yet </h2>
      <p> When you post a Trip, it'll show up here</p>
      </div>
      : this.props.current_user.trips.map(trip => <Trip info={trip} />).reverse() }

    </div>
  )
}
}

const mapStateToProps = (state) => {return { current_user: state.current_user, selected_trip: state.selected_trip}}

// const mapDispatchToProps = (dispatch) => ({
//   getCurrentUser: (token) => dispatch(getCurrentUser(token))
// })

export default connect(mapStateToProps)(withRouter(ProfileTripIndex));
