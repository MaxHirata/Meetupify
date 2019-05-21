const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const VenueSchema = new Schema({
//     name: { type: String, required: true },
//     image: String,
//     link: String,
//     location: { type: String, required: true },
//     desciption: { type: String, required: true }
// });

const VenueSchema = require('./Venue');
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

// //Create Schema
const VoteSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    venue: VenueSchema,
    eventTime: {
        type: Date,
        required: true
    },
    voterName: String,
    timeStamp: { type: Date, default: Date.now }
});

module.exports = VoteSchema;