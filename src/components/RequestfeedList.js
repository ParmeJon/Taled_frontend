import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../index';
import NewRequestfeedForm from './NewRequestfeedForm';
import FriendshipsArea from './FriendshipsArea';
import Cable from './Cable';
import {connect} from 'react-redux'

class RequestfeedList extends React.Component {
  state = {
    requestfeeds: [],
    activeRequestfeed: null
  };

  componentDidMount = () => {
    let token = localStorage.token
    return fetch (`${API_ROOT}/requestfeeds`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(requestfeeds => this.setState({ requestfeeds }));
  };

  handleClick = id => {
    this.setState({ activeRequestfeed: id });
  };

  handleReceivedRequestfeed = response => {
    const { requestfeed } = response;
    this.setState({
      requestfeeds: [...this.state.requestfeeds, requestfeed]
    });
  };

  handleReceivedFriendship = response => {
    const { friendship } = response;
    const requestfeeds = [...this.state.requestfeeds];
    const requestfeed = requestfeeds.find(
      requestfeed => requestfeed.id === friendship.requestfeed_id
    );
    requestfeed.friendships = [...requestfeed.friendships, friendship];
    this.setState({ requestfeeds });
  };

  render = () => {
    const { requestfeeds, activeRequestfeed } = this.state;
    return (
      <div className="requestfeedsList">
        <ActionCable
          channel={{ channel: 'RequestfeedsChannel' }}
          onReceived={this.handleReceivedRequestfeed}
        />
        {this.state.requestfeeds.length ? (
          <Cable
            requestfeeds={requestfeeds}
            handleReceivedFriendship={this.handleReceivedFriendship}
          />
        ) : null}
        <h2>Requestfeeds</h2>
        <ul>{mapRequestfeeds(requestfeeds, this.handleClick)}</ul>
        <NewRequestfeedForm />
        {activeRequestfeed ? (
          <FriendshipsArea
            requestfeed={findActiveRequestfeed(
              requestfeeds,
              activeRequestfeed
            )}
          />
        ) : null}
      </div>
    );
  };
}

export default connect()(RequestfeedList);

// helpers

const findActiveRequestfeed = (requestfeeds, activeRequestfeed) => {
  return requestfeeds.find(
    requestfeed => requestfeed.id === activeRequestfeed
  );
};

const mapRequestfeeds = (requestfeeds, handleClick) => {
  return requestfeeds.map(requestfeed => {
    return (
      <li key={requestfeed.id} onClick={() => handleClick(requestfeed.id)}>
        {requestfeed.title}
      </li>
    );
  });
};
