import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Navbar from './components/Navbar'
import Signup from './containers/signup'
import Login from './containers/login'
import Home from './containers/home'
import Profile from './containers/profile'
import TripContainer from './containers/TripContainer'

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/signup" render={() => <Signup />}/>
          <Route path="/login" render={() => <Login />}/>
          <Route path="/profile" render={() => <Profile />}/>
          <Route path="/selected_trip/:id" render={() => <TripContainer />} />
          <Route exact path="/" render={()=> <Home />}/>
        </Switch>
      </div>
    )
  }
}

export default App;
