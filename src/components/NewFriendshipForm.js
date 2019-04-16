// src/components/NewFriendshipForm.js

import React from 'react';
import { API_ROOT, HEADERS } from '../index';

class NewFriendshipForm extends React.Component {
  state = {
    text: '',
    requestfeed_id: this.props.requestfeed_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ requestfeed_id: nextProps.requestfeed_id });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/friendships`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: '' });
  };

  render = () => {
    return (
      <div className="newFriendshipForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Friendship:</label>
          <br />
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewFriendshipForm;
