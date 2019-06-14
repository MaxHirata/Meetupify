import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout';
import EventCreator from './containers/EventCreator';
import DisplayEvents from './containers/DisplayEvents';
import AddYelpVenues from './containers/AddNewVenues';
import LoginSignUp from './containers/Auth';
import AlertBar from './hoc/AlertBar'
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth';
import { setAuthToken } from './shared/utilities';

import { BrowserRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import eventBuilder from './store/reducers/eventBuilder';



class App extends Component {

  componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      console.log('token already exists flag');
    };

    console.log('inside CompWillMount New User in APP.js');
    store.dispatch(loadUser());
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/eventBuilder" component={EventCreator} />
        <Route path="/addVenues" component={AddYelpVenues} />
        <Route path="/displayEvents" component={DisplayEvents} />
        <Route path="/" exact component={LoginSignUp} />
      </Switch>
    );

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Layout>
              <AlertBar />
              <div className="">
                {routes}
              </div>





            </Layout>
          </div>
        </BrowserRouter>

      </Provider>
    );
  }
}

export default App;
