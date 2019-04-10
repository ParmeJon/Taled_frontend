import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";


class Post extends React.Component {



  render() {
    let date = new Date(`${this.props.info.updated_at}`)
    let imgLink = this.props.info.post_image ? this.props.info.post_image.image_url : 'https://images.unsplash.com/photo-1534685785745-60a2cea0ec34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2725&q=80'
      let style = {
        backgroundImage: `url( ${imgLink} )`
      }

    return(
      <div>
      <div className="blog-card">
        <div className="meta">
          <div className="photo" style={ style}></div>
          <ul className="details">
            <li className="author">{`${this.props.current_user.first_name} ${this.props.current_user.first_name}` }</li>
            <li className="date">{date.toLocaleTimeString()}</li>
            <li><i className="fas fa-trash" onClick={this.handleDelete}></i></li>
          </ul>
        </div>
        <div className="description">
          <h1>{this.props.info.title}</h1>
          <h2>{this.props.info.geolocation}</h2>
          <p> {this.props.info.content}</p>
          <p className="read-more">
            <a href="#">{date.toLocaleDateString()}</a>
          </p>
        </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user
})

export default connect(mapStateToProps)(withRouter(Post));
