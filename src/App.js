import React, { Component } from 'react';
import './App.css';
import Vendors from './containers/Vendors/Vendors';
import Application from './containers/Application/Application';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter basename="/">
        <div className="App">
          <Switch>
            <Route path='/vendors/:id' component={Vendors} />
            <Route path='/application/:card/:bank' component={Application} />
            <Route path='/' render={()=><h1>Not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
