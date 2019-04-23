import React from 'react'
import { connect } from "react-redux"
import TripHeader from "../components/TripHeader"
import NewPostModal from '../components/NewPostModal'
import TripPostIndex from '../components/TripPostIndex'
import {getSelectedTrip} from '../actions/action'
import { withRouter } from "react-router-dom";


class TripContainer extends React.Component {

  state = {
    newPostModalShow: false
  }

  newPostModalShow = () => {this.setState({newPostModalShow: true})}

componentDidMount() {
  let id = this.props.history.location.pathname.split("/selected_trip/")[1]
  this.props.getSelectedTrip(id)

}


render() {
    console.log("BIGGEST TEST", this.props.selected_trip)

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

const mapDispatchToProps = (dispatch) => ({
    getSelectedTrip: (id) => dispatch(getSelectedTrip(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TripContainer));
