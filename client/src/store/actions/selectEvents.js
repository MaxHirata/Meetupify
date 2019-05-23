import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getAllEvents = (message) => dispatch => {

    console.log(message);

    axios.get(`/api/events/`)
        .then(res => dispatch({
            type: actionTypes.GET_ALL_EVENTS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err);
        });
}

export const selectEvent = (event_id) => {
    console.log("inside selectEvent" + event_id);
    return {
        type: actionTypes.SELECT_EVENT,
        payload: event_id
    }
}

export const postEvent = (eventName) => {
    return {
        type: actionTypes.CREATE_EVENT,
        payload: eventName
    }
}

export const deleteEvent = (event_id) => {
    return {
        type: actionTypes.DELETE_EVENT,
        payload: event_id
    }
}