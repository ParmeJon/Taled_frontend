import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import ProgressBar from 'react-bootstrap/ProgressBar'


class ConcernMeter extends React.Component {

  state = {
    safeStatus: 100,
    completed: false
  }

componentDidMount() {
    if (this.props.selected_trip && !this.props.selected_trip.completed) {
      console.log('setting interval')
    this.myInterval = setInterval( () => {
    this.setSafeStatus()
  }, 2000)
}
}

// If Trip is finished will clear interval.
componentDidUpdate(prevProps, prevState) {
  if (this.props.selected_trip.completed) {
          console.log("updating stop interval");
      clearInterval(this.myInterval)
  }
  // This is only needed if you want to drop CM if recontinued
  // if (!this.props.selected_trip.completed) {
  //       this.myInterval = setInterval(() => {
  //         this.setSafeStatus();
  //       }, 2000);
  // }
}



componentWillUnmount() {
  console.log('unmounting and clearing interval')
  clearInterval(this.myInterval)
}

setSafeStatus() {
  // if (this.props && this.props.selected_trip_posts[1]) {
  const timeNow = Date.now()
  let latestUpdate
  let latestPost

  if (this.props.selected_trip_posts[0]) {
  // latestUpdate = this.props.selected_trip_posts[0].updated_at
    latestPost = this.props.selected_trip_posts.reduce(function(prev, curr) {
      return prev.id > curr.id ? prev : curr;
    });
    latestUpdate = latestPost.updated_at

  } else {
    latestUpdate = this.props.selected_trip.updated_at
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

  // for concern meter instead of safety meter
  // let safeStatus = 0
  // if (passedTime > 25 ) {
  //   safeStatus = 100
  // } else if (passedTime < 1){
  //   safeStatus = 0
  // } else {
  //   safeStatus += passedTime*4
  // }

  this.setState({
    safeStatus: Math.floor(safeStatus)
  })
}



render() {
  let status
  if (this.state.safeStatus > 55) {
    status = <h4 className="safe">Safe, you have recently posted</h4>
  } else if (this.state.safeStatus < 55 && this.state.safeStatus > 20 ) {
    status = <h4 className="moderate">Moderate, you haven't posted in a while.</h4>
  } else if (this.state.safeStatus < 25) {
    status = <h4 className="warning">Warning, please post again soon.</h4>
  }
  return (
    <div className="concern-meter">
      {status}
      { !this.props.current_user.first_name ? <ProgressBar variant="success" now={100} label={'Create your first trip!'}/> : this.state.safeStatus === 100 ?
      <ProgressBar variant="success" now={this.state.safeStatus} label={`${Math.floor(this.state.safeStatus)}%`}/>
      : <ProgressBar animated variant={this.state.safeStatus > 55 ? "success" : this.state.safeStatus > 25 ? "warning" : "danger"}  now={this.state.safeStatus} label={`${this.state.safeStatus}%`}/>
    }
    </div>
  )
}
}

const mapStateToProps = (state) => {return { current_user: state.current_user, selected_trip: state.selected_trip, selected_trip_posts: state.selected_trip_posts}}

// const mapDispatchToProps = (dispatch) => ({
//   editProfile: ()
// })

export default connect(mapStateToProps)(withRouter(ConcernMeter));
