const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    participants: [String],
    active: { type: Boolean, default: true },
    finalEvent: VenueSchema,
    venueList: [VenueSchema],
    votes: [VoteSchema],
});

module.exports = Event = mongoose.model('Event', EventSchema);