import React from 'react'
import { connect } from "react-redux"
import TripHeader from "../components/TripHeader"
import NewPostModal from '../components/NewPostModal'
import TripPostIndex from '../components/TripPostIndex'
// import { withRouter } from "react-router-dom";


class TripContainer extends React.Component {

  state = {
    newPostModalShow: false
  }

  newPostModalShow = () => {this.setState({newPostModalShow: true})}

render() {

let newPostModalClose = () => this.setState({newPostModalShow: false})

  return (
    <div className="trip-container">
      <TripHeader newPostModalShow={this.newPostModalShow}/>

      <NewPostModal
      show={this.state.newPostModalShow}
      onHide={newPostModalClose}
      />

      <div className="align-index">
      <TripPostIndex />
      </div>
    </div>
  )
}
}

const mapStateToProps = (state) => ({
  selected_trip: state.selected_trip
})

export default connect(mapStateToProps)(TripContainer);
