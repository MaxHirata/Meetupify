import * as actionTypes from '../actions/actionTypes';

const initialState = {
    venues: []
}

// Utility Function
const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const loadYelpVenues = (state, action) => {

    const yelpData = action.payload;
    const yelpDataVenues = [];

    yelpData.map(venue => {
        let venueData = {
            name: venue.name,
            image: venue.image_url,
            link: venue.url,
            location: venue.location.display_address.join(' '),
            rating: venue.rating,
            price: venue.price
        }

        yelpDataVenues.push(venueData);
    });

    console.log(yelpData);

    return updateObject(state, {
        //Add Venues Loaded From Yelp API
        venues: yelpDataVenues
    });
};

const getYelpVenues = (state) => {
    return {
        ...state
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOAD_YELP_VENUES:
            return loadYelpVenues(state, action)
        case actionTypes.GET_YELP_VENUES:
            return getYelpVenues(state)

        default:
            return state;
    }
}