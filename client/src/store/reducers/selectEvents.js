import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';


const initialState = {
    eventList: [],
    selectedEvent: null
};

const getAllEvents = (state, action) => {
    return updateObject(state, {
        eventList: action.payload
    });
}

const setSelectedEvent = (state, action) => {
    return updateObject(state, {
        selectedEvent: action.payload
    });
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ALL_EVENTS: return getAllEvents(state, action);
        case actionTypes.SELECT_EVENT: return setSelectedEvent(state, action);
        case actionTypes.DELETE_EVENT:
        default:
            return state;
    }
}