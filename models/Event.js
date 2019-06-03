const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const VenueSchema = require('./schemas/Venue');
//const VoteSchema = require('./schemas/Vote');

const VenueSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    image: String,
    link: String,
    location: { type: String, required: true },
    price: String,
    rating: { type: String, required: true }
});

const VoteSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    venue: VenueSchema,
    eventTime: Date,
    voterName: String,
    timeStamp: { type: Date, default: Date.now }
});

//Event Schema
const EventSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    eventName: {
        type: String,
        required: true
    },
    deadlineTime: {
        type: Date,
        default: Date.now
    },
    active: { type: Boolean, default: true },
    finalEvent: VenueSchema,
    venueList: [VenueSchema],
    votes: [VoteSchema],
});

// Old Scheme when creating more relational model
/*
const EventSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    deadlineTime: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

EventSchema.virtual('venues', {
    ref: 'Venue',
    localField: '_id',
    foreignField: 'eventKey'
});

EventSchema.virtual('votes', {
    ref: 'Vote',
    localField: '_id',
    foreignField: 'eventKey'
});
*/

module.exports = Event = mongoose.model('Event', EventSchema);