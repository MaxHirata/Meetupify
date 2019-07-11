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

export const addParticipant = (event_id, participant_username) => async dispatch => {
    console.log("inside Add Participant")
    try {
        await axios.post(`/api/events/${event_id}/participants/${participant_username}`);
        dispatch({
            type: actionTypes.ADD_PARTICIPANT
        })
    } catch (err) {
        console.error(err.message)
    }
}


export const setSelectedVenue = (venue) => {
    console.log("payload: " + venue.name);
    return {
        type: actionTypes.SET_SELECTED_VENUE,
        payload: venue
    };
};


export const addVenue = (event_id, venue) => async dispatch => {
    //const body = JSON.stringify(venue);
    //console.log(body);

    try {
        await axios.post(`/api/events/${event_id}/venues`, {
            name: venue.name,
            location: venue.location,
            link: venue.link,
            image: venue.image,
            price: venue.price,
            rating: venue.rating
        });
        dispatch({
            type: actionTypes.ADD_VENUE
        });
    } catch (err) {
        console.error(err.message);
    }
};

export const removeVenue = (venue) => {

}

export const sendVote = (event_id, venue) => async dispatch => {
    try {
        await axios.post(`/api/events/${event_id}/votes`, {
            venue: venue
        });
        dispatch({
            type: actionTypes.SEND_VOTE
        });

    } catch (err) {
        console.error(err.message);
    }
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