import React from 'react';
import img from '../images/Taled_cover.svg';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'


class Home extends React.Component {

render() {
  return (
    <div id="cover">
      <img className="cover" src={img}/>
      <div className="quote">"tell the story with your loved ones in mind"</div>
      <div className="title">TaleD</div>
      <div className="begin">
      <Button variant="info" block size="lg" onClick={()=>{localStorage.token ? this.props.history.push('/profile') : this.props.history.push('/signup')}}>{localStorage.token ? "Continue" : "Begin"}</Button>
      </div>
    </div>
  )
}
}

export default withRouter(Home);
