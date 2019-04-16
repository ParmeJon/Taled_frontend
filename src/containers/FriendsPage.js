import RequestfeedList from '../components/RequestfeedList'
import React from 'react';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'



class FriendsPage extends React.Component {

render() {
  console.log(this.props.current_user)
  return (
    <div className="friends-page">
      <RequestfeedList />

    </div>
  )
}
}

const mapStateToProps = (state) => ({
  current_user: state.current_user
})

export default connect(mapStateToProps)(withRouter(FriendsPage));
