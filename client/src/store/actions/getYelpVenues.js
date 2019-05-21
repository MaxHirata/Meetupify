import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadYelpVenues = (searchData) => dispatch => {
    console.log(searchData.term + " " + searchData.location);

    axios.get(`/api/yelp/${searchData.term}/${searchData.location}`)
        .then(res => dispatch({
            type: actionTypes.LOAD_YELP_VENUES,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err)
        })
}

export const getYelpVenues = () => {
    return {
        type: actionTypes.GET_YELP_VENUES
    };
};

export const refreshYelpVenues = () => {
    return {
        type: actionTypes.REFRESH_YELP_VENUES
    };
};