import React from 'react';
import { API_ROOT, HEADERS } from '../index';

class NewRequestfeedForm extends React.Component {
  state = {
    title: ''
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    let token = localStorage.token
    fetch(`${API_ROOT}/requestfeeds`, {
      method: 'POST',
      headers:  {
        "content-type": "application/json",
            accepts: "application/json",
            Authorization: `Bearer ${token}`
          },
      body: JSON.stringify(this.state)
    });
    this.setState({ title: '' });
  };

  render = () => {
    return (
      <div className="newRequestfeedForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Requestfeed:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewRequestfeedForm;
