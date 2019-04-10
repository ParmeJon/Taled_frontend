import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import ProgressBar from 'react-bootstrap/ProgressBar'


class ConcernMeter extends React.Component {

  state = {
    safeStatus: 100
  }

componentDidMount() {
    console.log(this.props)
    this.myInterval = setInterval( () => {
    this.setSafeStatus()
  }, 2000);
}

componentWillUnmount() {
  clearInterval(this.myInterval)
}

setSafeStatus() {
  // if (this.props && this.props.selected_trip_posts[this.props.selected_trip_posts.length - 1]) {
  console.log("starting setsafestatus", this.state.safeStatus)
  let timeNow = Date.now()
  let latestUpdate = this.props.selected_trip_posts[this.props.selected_trip_posts.length - 1].updated_at
  let latestUpdateDate = new Date(`${latestUpdate}`)
  let latestUpdateTimeMs = latestUpdateDate.getTime()
  // get the time passed in hours
  let passedTime = (((timeNow - latestUpdateTimeMs) / 1000) / 60) / 60
  let safeStatus = 100
  if (passedTime < 1) {
    safeStatus = 100
  } else if (passedTime > 25){
    safeStatus = 0
  } else {
    safeStatus -= passedTime*4
  }

  console.log("passing of time", passedTime)

  this.setState({
    safeStatus: Math.floor(safeStatus)
  })
// }
}



render() {
  return (
    <div className="concern-meter">
      <h5>Concern Meter</h5>
      { this.state.safeStatus === 100 ?
      <ProgressBar variant="success" now={this.state.safeStatus} label={`${Math.floor(this.state.safeStatus)}%`}/>
      : <ProgressBar animated variant={this.safeStatus < 25 ? "danger" : this.safeStatus < 65 ? "warning" : "success"}  now={this.state.safeStatus} label={`${this.state.safeStatus}%`}/>
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
