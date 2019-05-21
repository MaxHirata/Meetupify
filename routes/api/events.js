const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Event Model
//const User = require('../../models/User');
const Event = require('../../models/Event');

//GET Events
router.get("/", (req, res, next) => {
    Event.find()
        .then(events => res.json(events));
});

//GET Event By Id
router.get('/:id', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(404).json({ success: false }));
});

//GET Event Venues
router.get('/:id/venues', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => res.json(event.venueList))
        .catch(err => res.status(404).json({ status: "venues NOT found" }));
});

//GET Event Votes (maybe Calculate votes later....)
router.get('/:id/votes', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            res.json(event.votes);
            //calc votes
            //check the timeStamp
        })
});


//POST New Event
router.post("/", (req, res, next) => {
    const newEvent = new Event({
        _id: new mongoose.Types.ObjectId,
        eventName: req.body.eventName,
        deadlineTime: req.body.deadlineTime
    });

    newEvent.save().then(event => res.json(event));

});

//POST Change Event Name
router.post('/:id/deadlineDate', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            event.deadlineTime = req.body.eventName;
            event.save().then(() => res.json({ eventName: 'change successful!!' }));
        })
        .catch(err => res.status(404).json({ error: false }));
});

//POST change Deadline
router.post('/:id/deadlineDate', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            event.deadlineTime = req.body.deadlineTime;
            event.save().then(() => res.json({ deadlineTime: 'change successful!!' }));
        })
        .catch(err => res.status(404).json({ error: false }));
});

//POST New Venue to Event
router.post("/:id/venue", (req, res, next) => {

    const newVenue = {
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        location: req.body.location,
        description: req.body.description
    };

    Event.findById(req.params.id)
        .then(event => {
            event.venueList.push(newVenue);
            event.save().then(() => res.json(event));
        })
        .catch(err => res.status(404).json({ error: 'not working...' }));
});

//POST New Vote to Event
router.post('/:id/vote', (req, res, next) => {
    const selectedVenue = {
        _id: req.body.venueId,
        name: req.body.venueName,
        location: req.body.venueLocation,
        description: req.body.venueDescription
    }

    const newVote = {
        _id: new mongoose.Types.ObjectId,
        venue: selectedVenue,
        eventTime: req.body.eventTime,
        voterName: req.body.voterName,
        timeStamp: req.body.timeStamp
    }

    Event.findById(req.params.id)
        .then(event => {
            event.votes.push(newVote);
            event.save().then(() => res.json(event));
        })
        .catch(err => res.status(404).json({ error: 'not working....' }));
});

//POST Calculate Votes for Final Events
router.post('/:id/finalEvent', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            //check deadline date with current time
            //count votes
            //calc event time
            //post final venue and time
        });
});

//DELETE Event
router.delete('/:id', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => event.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

//DELETE Event Venues
router.delete('/:id/:venueId', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            event.venueList.findById(req.params.venueId)
                .then(venue => venue.remove().then(() => res.json({ success: true })))
                .catch(err => res.status(404).json({ success: false }));
        })
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;