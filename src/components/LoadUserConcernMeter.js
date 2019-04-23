import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import ProgressBar from 'react-bootstrap/ProgressBar'


class LoadUserConcernMeter extends React.Component {

  state = {
    safeStatus: 100
  }

componentDidMount() {
    console.log(this.props)
    if (!this.props.info.trips[this.props.info.trips.length - 1].completed) {
    this.myInterval = setInterval( () => {
    this.setSafeStatus()
  }, 2000)
}
}

componentWillUnmount() {
  clearInterval(this.myInterval)
}

setSafeStatus() {
  // if (this.props && this.props.selected_trip_posts[this.props.selected_trip_posts.length - 1]) {
  let timeNow = Date.now()
  let latestUpdate
  let latestPost

  if (this.props.info.posts[this.props.info.posts.length - 1]) {
  latestPost = this.props.info.posts.reduce(function(prev, curr) {
    return prev.id > curr.id ? prev : curr;
  });
  latestUpdate = latestPost.updated_at
  } else {
    latestUpdate = this.props.info.trips[this.props.info.trips.length - 1].updated_at
  }

  let latestUpdateDate = new Date(`${latestUpdate}`)
  let latestUpdateTimeMs = latestUpdateDate.getTime()
  // get the time passed in hours
  let passedTime = (((timeNow - latestUpdateTimeMs) / 1000) / 60) / 60
  let safeStatus = 100
  if (passedTime < 1 ) {
    safeStatus = 100
  } else if (passedTime > 25){
    safeStatus = 0
  } else {
    safeStatus -= passedTime*4
  }

  // for concer meter instead of safety meter
  // let safeStatus = 0
  // if (passedTime > 25 ) {
  //   safeStatus = 100
  // } else if (passedTime < 1){
  //   safeStatus = 0
  // } else {
  //   safeStatus += passedTime*4
  // }

  // console.log("passing of time", passedTime)

  this.setState({
    safeStatus: Math.floor(safeStatus)
  })
}



render() {
  let status
  if (this.state.safeStatus > 55) {
    status = <p className="safe">Safe, {this.props.info.first_name} has recently posted</p>
  } else if (this.state.safeStatus < 55 && this.state.safeStatus > 20 ) {
    status = <p className="moderate">Moderate, {this.props.info.first_name} has not posted in a while.</p>
  } else if (this.state.safeStatus < 25) {
    status = <p className="warning">Warning, {this.props.info.first_name} needs to post again soon.</p>
  }
  // console.log("SAFESTATUS", this.state.safeStatus)
  return (
    <div className="load-user-concern-meter">
      <h3>Ongoing: {this.props.info.trips[this.props.info.trips.length - 1].title}</h3>
      {status}
      { this.state.safeStatus === 100 ?
      <ProgressBar variant="success" now={this.state.safeStatus} label={`${Math.floor(this.state.safeStatus)}%`}/>
      : <ProgressBar animated variant={this.state.safeStatus > 55 ? "success" : this.state.safeStatus > 25 ? "warning" : "danger"}  now={this.state.safeStatus} label={`${this.state.safeStatus}%`}/>
    }
    </div>
  )
}
}

// const mapStateToProps = (state) => {return { current_user: state.current_user, selected_trip: state.selected_trip, selected_trip_posts: state.selected_trip_posts}}

// const mapDispatchToProps = (dispatch) => ({
//   editProfile: ()
// })

export default connect(null)(withRouter(LoadUserConcernMeter));
