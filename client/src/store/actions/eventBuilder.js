import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadSelectedEvent = (event_id) => async dispatch => {
    const res = await axios.get(`/api/events/${event_id}`)
    try {
        dispatch({
            type: actionTypes.LOAD_SELECTED_EVENT,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
    }
}

export const getVenues = (event_id) => dispatch => {

    axios.get(`/api/events/${event_id}/venues`)
        .then(res => dispatch({
            type: actionTypes.GET_VENUES,
            payload: res.data
        }))
        .catch(err => {
            console.log(err)
        });
    // return {
    //     type: actionTypes.GET_VENUES
    // };
};

export const getParticipants = (event_id) => async dispatch => {

    try {
        const res = await axios.get(`/api/${event_id}/participants`);
        dispatch({
            type: actionTypes.GET_PARTICIPANTS,
            payload: res.data
        });

    } catch (err) {
        console.log(err.message);
    }

}

export const setSelectedVenue = (venue) => {
    console.log("payload: " + venue.name);
    return {
        type: actionTypes.SET_SELECTED_VENUE,
        payload: venue
    };
};


export const addVenue = (venue) => {
    return {
        type: actionTypes.ADD_VENUE,
        payload: venue
    }
};

export const removeVenue = (venue) => {

}

// export const sendVoteStart = ( voteData ) => {
//     return {
//         type: actionTypes.GET_VENUES
//     }
// };

// export const sendVote = ( voteData ) => {
//     return dispatch => {
//         dispatch( sendVoteStart() );
//     };
// };