import React from 'react'
import { connect } from 'react-redux'
import {selectTrip, deleteTrip} from '../actions/action'
import { withRouter } from "react-router-dom";


class Trip extends React.Component {

  handleSelect = () => {
    console.log('working?')
    this.props.selectTrip(this.props.info)
    this.props.history.push(`/selected_trip/${this.props.info.id}`)
  }

  handleDelete = () => {
    this.props.deleteTrip(this.props.info)
  }

  render() {
    return(
      <div>
      <div className="container">
        <div className="card">
          <h2>{this.props.info.title}</h2>
          <i className="fas fa-arrow-right"></i>
          <p>{this.props.info.completed ? "Finished" : "Ongoing"}</p>
          <div className="pic"></div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>

          </ul>
          <div className="social">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fas fa-trash" onClick={this.handleDelete}></i>
          </div>
          <button onClick={this.handleSelect}>
          </button>
        </div>
        </div>
      </div>

    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  selectTrip: (tripInfo) => dispatch(selectTrip(tripInfo)),
  deleteTrip: (tripInfo) => dispatch(deleteTrip(tripInfo))
})

export default connect(null, mapDispatchToProps)(withRouter(Trip));
