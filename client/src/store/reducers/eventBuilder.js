import * as actionTypes from '../actions/actionTypes';
import uuid from 'uuid';

const initialState = {
    id: uuid,
    venues: [
        {
            name: "Coffee Brew House",
            image: "",
            link: "",
            location: "Kaimuki, HI 96816",
            rating: 4,
            price: "$$"
        },
        {
            name: "Mama's Bar",
            image: "",
            link: "",
            location: "Honolulu, HI 88888",
            rating: 5,
            price: "$"
        },
        {
            name: "Teapresso",
            image: "",
            link: "",
            location: "Piikoi, HI 96816",
            rating: 3,
            price: "$"
        },
        {
            name: "Teapresso2",
            image: "",
            link: "",
            location: "Piikoi, HI 96816",
            rating: 4,
            price: "$$"
        }
    ],
    yelpVenues: [],
    selectedVenue: {
        name: null,
        image: null,
        link: null,
        location: null,
        rating: null,
        price: null
    },
    selectedTime: null,
    votes: []
};


// const VenueSchema = new Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name: {
//         type: String,
//         required: true
//     },
//     image: String,
//     link: String,
//     location: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     }
// });

// const VoteSchema = new Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     venue: VenueSchema,
//     eventTime: {
//         type: Date,
//         required: true
//     },
//     voterName: String,
//     timeStamp: { type: Date, default: Date.now }
// });

// const EventSchema = new Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     eventName: String,
//     deadlineTime: { type: Date, default: Date.now },
//     active: { type: Boolean, default: true },
//     finalEvent: VenueSchema,
//     venueList: [VenueSchema],
//     votes: [VoteSchema],
// });
const newInitialState = {
    id: null,
    eventName: "",
    deadlineTime: null,
    active: false,
    finalEvent: null,
    venueList: [],
    vots: []
};

// Utility Function
const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const getVenues = (state, action) => {
    const venueData = action.payload;
    console.log(venueData);

    let venueList = [];

    venueData.map(venue => {
        let loadedVenue = {
            name: venue.name,
            location: venue.location,
            link: venue.link,
            image: venue.image,
            price: venue.price,
            rating: venue.rating
        };

        venueList.push(loadedVenue);
    });

    return updateObject(state, {
        venues: venueList
    });
};

const setSelectedVenue = (state, action) => {
    return updateObject(state, {
        selectedVenue: {
            name: action.payload.name,
            image: null,
            link: null,
            location: action.payload.location,
            rating: action.payload.rating,
            price: action.payload.price
        }
    });
};

const addVenue = (state, action) => {
    const newVenue = {
        name: action.payload.name,
        image: null,
        link: null,
        location: action.payload.venueLocation,
        rating: action.payload.venueRating,
        price: action.payload.venuePrice
    }
    let venueList = state.venue;
    venueList.push(newVenue);

    return updateObject(state, {
        venues: venueList
    });
};

const setVote = (state, action) => {
    let voteList = state.votes;
    voteList.push(state.selectedVenue);

    return updateObject(state, {
        votes: voteList
    });
};


export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_VENUES:
            return getVenues(state, action);
        case actionTypes.SET_SELECTED_VENUE:
            return setSelectedVenue(state, action);

        default:
            return state;
    }
}