import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getAllEvents = () => {
    return {
        type: actionTypes.GET_ALL_EVENTS
    }
}

export const selectEvent = (event_id) => {
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