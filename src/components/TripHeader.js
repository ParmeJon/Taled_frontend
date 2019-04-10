import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ConcernMeter from './ConcernMeter'
import {updateFinishTrip} from '../actions/action'


class TripHeader extends React.Component {


handleFinish = () => {
  console.log("finish handle", this.props.selected_trip.id )
  this.props.finishTrip(this.props.selected_trip.id, this.props.selected_trip.completed)
  this.props.history.push("/profile")
}


render() {
  return (
    <div className="trip-header">
      <div className="trip-title">
      {this.props.selected_trip.title}
      </div>

      <ConcernMeter />


      <div className="trip-info">
        <div className="third-bar">
        <Button variant="outline-success" block size="lg" onClick={this.props.newPostModalShow}>New Post</Button>
        </div>
        <div className="third-bar">
        <Button variant="outline-info" block size="lg" onClick={this.handleFinish}>{this.props.selected_trip.completed ? "Recontinue?" : "Finish Trip"}</Button>
        </div>
        <div className="third-bar">
          {this.props.current_user.active ? <p className="trip-active-mark">Available</p> : <p className="trip-busy-mark">Busy</p>}
        </div>
      </div>

    </div>
  )
}
}

const mapStateToProps = (state) => {return { current_user: state.current_user, selected_trip: state.selected_trip}}

const mapDispatchToProps = (dispatch) => ({
  finishTrip: (id, completed) => dispatch(updateFinishTrip(id, completed))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TripHeader));
