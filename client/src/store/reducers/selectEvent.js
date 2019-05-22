import * as actionTypes from '../actions/actionTypes';

const initialState = {
    events: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ALL_EVENT:
            return {
                ...state
            }
        case actionTypes.SELECT_EVENT:
            return setSelectedVenue(state, action);

        case actionTypes.DELETE_EVENT:

        default:
            return state;
    }
}