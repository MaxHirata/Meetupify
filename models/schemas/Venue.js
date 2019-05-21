const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    image: String,
    link: String,
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = VenueSchema;
//module.exports = Venue = mongoose.model('Venue', VenueSchema);