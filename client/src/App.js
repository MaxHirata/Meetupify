import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout';
import EventCreator from './containers/EventCreator';
import DisplayEvents from './containers/DisplayEvents';
import AddYelpVenues from './containers/AddNewVenues';
import LoginSignUp from './containers/Auth';
import { Provider } from 'react-redux';
import store from './store/store';

import { BrowserRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
//import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import eventBuilder from './store/reducers/eventBuilder';

class App extends Component {

  render() {

    let routes = (
      <Switch>
        <Route path="/eventBuilder" component={EventCreator} />
        <Route path="/addVenues" component={AddYelpVenues} />
        <Route path="/login" component={LoginSignUp} />
        <Route path="/" exact component={DisplayEvents} />
      </Switch>
    );

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Layout>
              {routes}
            </Layout>
          </div>
        </BrowserRouter>

      </Provider>
    );
  }
}

export default App;
