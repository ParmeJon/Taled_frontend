import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT } from '../index';
import NewRequestfeedForm from './NewRequestfeedForm';
import FriendshipsArea from './FriendshipsArea';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
// import Cable from './Cable';
import {getCurrentUser} from '../actions/action'
import {connect} from 'react-redux'

class RequestfeedList extends React.Component {
  state = {
    requestfeeds: [],
    connected: false
  };

  componentDidMount() {
    console.log("MOUNTING")
    let token = localStorage.token
    fetch (`${API_ROOT}/friendships`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => this.setState({ requestfeeds: res}))//, () => this.setState({test: "test"})))
  };

//   componentDidUpdate = (prevProps, prevState) => {
//   if (this.state.requestfeeds !== prevState.requestfeeds) {
//     let token = localStorage.token
//     fetch(`${API_ROOT}/friendships`, {
//       method: 'GET',
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`
//       },
//     })
//     .then(resp => resp.json())
//     .then( requestfeeds => this.setState({ requestfeeds: requestfeeds }));
//   }
// }

  // handleClick = id => {
  //   this.setState({ activeRequestfeed: id }, () => console.log(this.state));
  // };
  handleConnected = () => {
    this.setState({
      connected: true
    })
  }

  handleReceivedRequestfeed = (response) => {
    console.log(response)
    this.setState({
      requestfeeds: [...this.state.requestfeeds, response.friendship]
    }, () => console.log(this.state));
  };

  handleAcceptRequest = (e) => {
    let token = localStorage.token
    let id = e.target.parentElement.className
    fetch (`${API_ROOT}/friendships/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ requestfeeds: res.filteredFriendships, user: res})//, () => this.setState({test: "test"})))
        this.props.updateUser(res)
      })
  }
  // handleReceivedFriendship = response => {
  //   const { friendship } = response;
  //   console.log(response)
  //   const requestfeeds = [...this.state.requestfeeds];
  //   const requestfeed = requestfeeds.find(
  //     requestfeed => requestfeed.id === friendship.requestfeed_id
  //   );
  //   requestfeed.friendships = [...requestfeed.friendships, friendship];
  //   this.setState({ requestfeeds });
  // };

  render() {
    console.log("RENDER STATE", this.state)
    let connected
    const { requestfeeds} = this.state;
    return (
      <div className="requestfeedsList">

        <ActionCableConsumer
          onConnected={() => console.log("CONNECTED")}
          onDisconnected={() =>console.log("DISCONNECTED")}
          onInitialized={() =>console.log("INITIALIZED")}
          onRejected={() => console.log("rejected")}
          channel={{ channel: 'FriendshipsChannel' }}
          onReceived={this.handleReceivedRequestfeed}
        />

        <h2>Friend Requests {this.state.connected ? 'connected' : null}</h2>
        <div className="friend-requests">{mapRequestfeeds(requestfeeds, this.handleAcceptRequest)}</div>
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateUser: (res) => dispatch(({type: 'UPDATE_USER', payload: res})),
})

export default connect(null, mapDispatchToProps)(RequestfeedList);

// helpers

const mapRequestfeeds = (requestfeeds, onclick) => {



  return requestfeeds.map(requestfeed => {
    // console.log("FEED", requestfeed)
    return (
      <Card>
      <Card.Body>
      <div key={requestfeed.id} className={requestfeed.id}>
        <Card.Title>
        <p>{requestfeed.message}</p>
        </Card.Title>
        <Button onClick={onclick}>Accept</Button>
      </div>
      </Card.Body>
      </Card>

    );
  });
};
