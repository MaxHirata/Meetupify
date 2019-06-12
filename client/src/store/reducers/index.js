import { combineReducers } from 'redux';
import eventBuilder from './eventBuilder';
import yelpVenues from './getYelpVenues';
import selectEvents from './selectEvents';
import auth from './auth';
import alerts from './alerts';

export default combineReducers({
    eventList: selectEvents,
    event: eventBuilder,
    yelpVenues: yelpVenues,
    alerts: alerts,
    auth: auth
});