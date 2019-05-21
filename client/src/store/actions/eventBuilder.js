import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getVenues = () => {
    return {
        type: actionTypes.GET_VENUES
    };
};

export const setSelectedVenue = (venue) => {
    console.log("payload: " + venue.name);
    return {
        type: actionTypes.SET_SELECTED_VENUE,
        payload: venue
    };
};

export const getYelpVenues = (searchData) => {
    return dispatch => {
        axios.get('https://api.yelp.com/v3/businesses/search', {
            header: {
                Authorization: `Bearer j61WKiZTg6nb72TbDbELqGZAJ4-WNSJ_u3TCuGvWYepRn61-HP7grxlwTM1B9zeQ45un9AZs4n6iGwB9tn5rxVdBMLiIIzDfV54--ff6UB45nllFhM06lxmZxlhZXHYx`
            },
            params: {
                location: searchData.location,
                term: searchData.terms,
                limit: searchData.limit
            }
        })
            .then(res => dispatch({
                type: actionTypes.GET_YELP_VENUES,
                payload: res.data
            }))
            .catch((err) => {
                console.log(err)
            })
    }
}

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