import RequestfeedList from '../components/RequestfeedList'
import React from 'react';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'



class FriendsPage extends React.Component {

render() {
  return (
    <div className="friends-page">
      <RequestfeedList />
    </div>
  )
}
}

export default withRouter(FriendsPage);
