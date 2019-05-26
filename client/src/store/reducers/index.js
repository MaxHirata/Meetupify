import { combineReducers } from 'redux';
import eventBuilder from './eventBuilder';
import yelpVenues from './getYelpVenues';
import selectEvents from './selectEvents';

export default combineReducers({
    eventList: selectEvents,
    event: eventBuilder,
    yelpVenues: yelpVenues
});