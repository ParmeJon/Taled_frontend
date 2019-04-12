import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";


class LoadUsersCard extends React.Component {



  render() {
    return(
      <div>
      <p>{this.props.info.first_name}</p>
      </div>

    )
  }
}



export default connect()(withRouter(LoadUsersCard));
