import React, { Component } from 'react';
import './App.css';
import Vendors from './containers/Vendors/Vendors';
import Application from './containers/Application/Application';
import { Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {
    return (
        <div className="App">
          <Switch>
            <Route path='/vendors/:id' component={Vendors} />
            <Route path='/application/:card/:bank' component={Application} />
            <Route path='/' render={()=><h1 className="text-center">Not found</h1>} />
          </Switch>
        </div>
    );
  }
}

export default App;
