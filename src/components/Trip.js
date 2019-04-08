import React from 'react'

class Trip extends React.Component {

  render() {
    return(
      <div>
      <div className="container">
        <div className="card">
          <h2>{this.props.info.title}</h2>
          <i className="fas fa-arrow-right"></i>
          <p>{this.props.info.completed ? "Finished" : "Ongoing"}</p>
          <div className="pic"></div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>

          </ul>
          <div className="social">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-yelp"></i>
          </div>
          <button>
          </button>
        </div>
        </div>
      </div>

    )
  }
}

export default Trip
