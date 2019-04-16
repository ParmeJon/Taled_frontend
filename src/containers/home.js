import React from 'react';
import img from '../images/Taled_cover.svg';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import ConcernMeter from '../components/ConcernMeter'
import {connect} from 'react-redux'
import {getRecentTrip} from '../actions/action'


class Home extends React.Component {

  componentDidMount() {
    this.props.getCurrentTrip()
  }

render() {
  return (
    <div id="cover">
      <img className="cover" src={img}/>
      <div className="quote">"tell the story with your loved ones in mind"</div>
      <div className="title">TaleD</div>
      <div className="begin">
      <Button variant="info" block size="lg" onClick={()=>{localStorage.token ? this.props.history.push('/profile') : this.props.history.push('/signup')}}>{localStorage.token ? "Continue" : "Begin"}</Button>
      </div>
      <div className="statistics">
        <img className="baloons" src="https://wallup.net/wp-content/uploads/2016/10/12/363455-mountains-forest-animals-Firewatch-minimalism.jpg"></img>
      </div>
      <div >
      <div className="update-title"><h1 className="statistics-title">Tell your story in good conscience.</h1></div>
      <p className="update-current-trip">{this.props.selected_trip.title} Concern Meter</p>
      <ConcernMeter />
      </div>
    </div>
  )
}
}

const mapDispatchToProps = (dispatch) => ({
  getCurrentTrip: () => dispatch(getRecentTrip())
})

const mapStateToProps = (state) => ({
  selected_trip: state.selected_trip
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
