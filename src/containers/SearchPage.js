import React from 'react'
import { connect } from "react-redux"
import {loadUsers} from "../actions/action"
import LoadUsersCard from '../components/LoadUsersCard'
// import { withRouter } from "react-router-dom";


class SearchPage extends React.Component {

componentDidMount() {
  this.props.loadUsers()
}

render() {
  let { loaded_users, set_term, current_user } = this.props
  let componentOfUsers
  if (loaded_users.users) {
  let filteredUsers = loaded_users.users.filter(user => user.first_name.toLowerCase().includes(set_term.toLowerCase()) || user.email.toLowerCase().includes(set_term.toLowerCase()) || user.last_name.toLowerCase().includes(set_term.toLowerCase()))
  componentOfUsers = filteredUsers.map(user => <LoadUsersCard info={user} />)
  }
  console.log(componentOfUsers)
  return (
    <div className="search-page">
      <h1>Welcome to the Search Page</h1>
        {componentOfUsers && componentOfUsers.length > 0 ? componentOfUsers : "No Users based on search term"}
    </div>
  )
}
}

const mapStateToProps = (state) => ({
  current_user: state.current_user, set_term: state.set_term, loaded_users: state.loaded_users
})

const mapDispatchToProps = dispatch => ({
  loadUsers: () => dispatch(loadUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
