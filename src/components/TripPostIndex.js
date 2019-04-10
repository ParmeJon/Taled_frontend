import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Post from './Post'
// import { getCurrentUser } from '../actions/action'


class TripPostIndex extends React.Component {

render() {
  console.log("trips' posts", this.props.selected_trip_posts)
  console.log("current user", this.props.current_user)
  return (
    <div id="trip-post-index">
    {this.props.selected_trip_posts || this.props.selected_trip_posts.length > 0 ?
      this.props.selected_trip_posts.map(post => <Post info={post} />).reverse()
      : <div>
      <h2>You haven't made any posts for this trip yet </h2>
      <p> When you make a Post, it'll show up here</p>
      </div>
        }

    </div>
  )
}
}

const mapStateToProps = (state) => {return { current_user: state.current_user, selected_trip: state.selected_trip, selected_trip_posts: state.selected_trip_posts}}

// const mapDispatchToProps = (dispatch) => ({
//   getCurrentUser: (token) => dispatch(getCurrentUser(token))
// })

export default connect(mapStateToProps)(withRouter(TripPostIndex));
