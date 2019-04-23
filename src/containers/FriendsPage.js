import RequestfeedList from '../components/RequestfeedList'
import React from 'react';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import LoadFriendsCard from '../components/LoadFriendsCard'



class FriendsPage extends React.Component {

render() {
  let friendsArr
  let approvedFriendsArr
  let idApprovedFriendsArr
  let correctFriendsArr
  let approvedOnlyFriendsArr
  let unique = [];
  console.log("CURRENTUSER IN LOADING FRIENDS", this.props.current_user)
  // need to limit only displaying true approve status friendships.
  if (this.props.current_user.friends) {

    approvedFriendsArr = this.props.current_user.friendships.filter(friendship => friendship.approve_status)
    approvedOnlyFriendsArr = approvedFriendsArr.filter(friendship => !(friendship.friend_id === this.props.current_user.id))
    console.log("APPROVEDFRIENDSARR", approvedFriendsArr)
    idApprovedFriendsArr = approvedOnlyFriendsArr.map(friendship => friendship.friend_id)
    console.log("idAPPROVEDFRIENDS", idApprovedFriendsArr)
  correctFriendsArr = this.props.current_user.friends.filter(friend => idApprovedFriendsArr.includes(friend.id))
    // unique = correctFriendsArr.filter(friend => )
    console.log("CORRECTFRIENDSARR", correctFriendsArr)
    const visited = new Set()
    console.log(correctFriendsArr, "CORRECT")
    correctFriendsArr.forEach(friend => {
      if (!visited.has(friend.id)) {
        visited.add(friend.id);
        unique.push(friend);
        console.log(friend, "friend")
      }
    })
    friendsArr = unique.map(friend => <LoadFriendsCard key={friend.id} info={friend}/>)
  }
  return (
    <div className="friends-page">
      <RequestfeedList />

      <div>
      <h1>My Friends </h1>
      </div>
      <div className="search-cards">
      {friendsArr}
      </div>
    </div>
  )
}
}

const mapStateToProps = (state) => ({
  current_user: state.current_user
})

export default connect(mapStateToProps)(withRouter(FriendsPage));
