import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getVenues = (event_id) => dispatch => {

    axios.get(`api/events/${event_id}/venues`)
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