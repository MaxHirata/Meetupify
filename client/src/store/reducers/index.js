import { combineReducers } from 'redux';
import eventBuilder from './eventBuilder';
import yelpVenues from './getYelpVenues';

export default combineReducers({
    event: eventBuilder,
    yelpVenues: yelpVenues
});