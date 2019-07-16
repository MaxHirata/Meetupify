const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

//Event Model
const User = require('../../models/User');
const Event = require('../../models/Event');

//POST New Event
/**
 * @route POST /api/events/
 * @desc Create New Event
 * @access Private
 */
router.post("/", [auth, [
    check('eventName', 'Event Name is required').not().isEmpty(),
    check('deadlineTime', 'Deadline Time is Required').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);
        console.log(errors.isEmpty());
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        console.log("Inside Create Event ROUTE");

        //Build new Event Object
        const eventFields = {
            owner: req.user.id,
            eventName: req.body.eventName,
            deadlineTime: req.body.deadlineTime,
            participants: [req.user.username],
            finalEvent: null
        };

        try {
            //Create
            let event = new Event(eventFields);

            await event.save();
            res.json(event);

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error3");
        }
    }
);

/**
 * @route GET /api/events/me
 * @desc Retrieve (Owner)User's Events
 * @access Private
 */
router.get('/me', auth, async (req, res) => {
    try {
        const event = await Event.find({ owner: req.user.id }).populate('owner', ['username']);

        if (!event) {
            res.status(400).json({ msg: 'There is no event for this user ' });
        }

        res.json(event);
    } catch (err) {
        console.error(errl.message);
        res.status(500).send('Server Error3');
    }
});

//GET USER EVENTS
/**
 * @route GET /api/events/
 * @desc Retrieve (Owner)User's Events
 * @access Private
 */
router.get('/', auth, async (req, res) => {
    console.log("inside basic route")
    try {
        const events = await Event.find({ owner: req.user.id }).populate('owner', ['eventName', 'deadlineTime']);
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server ERROR: GET USER EVENTS');
    }
});

//GET Participants associated Events
router.get('/participatingEvents', auth, async (req, res) => {
    //console.log("Inside Get Participating  Events")
    function isParticipant({ participants }) {
        return participants.includes(req.user.username)
    }

    try {
        console.log("Username:" + req.user.username);
        const events = await Event.find()

        participatingEvents = []
        events.forEach(function (event) {
            //console.log(Array.from(event.participants).includes(req.user.username))

            if (event.participants.includes(req.user.username) && (event.owner != req.user.id)) {
                //console.log(event.participants.includes(req.user.username))
                participatingEvents.push(event)
            }
        });


        res.json(participatingEvents)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error on Finding Participant")
    }
});

/**
 * @route GET /api/events/:id
 * @desc Get Event Info By Event Id
 * @access Public
 */
router.get('/:id', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(404).json({ success: false }));
});


//GET Event Venues
/**
 * @route GET /api/:event_id/venues
 * @desc Retrieve Event's Venues
 * @access Public
 */
router.get('/:event_id/venues', (req, res, next) => {
    console.log("Insie get Event Venue Route");
    Event.findById(req.params.event_id)
        .then(event => res.json(event.venueList))
        .catch(err => res.status(404).json({ status: "venues NOT found" }));
});


/**
 * @route GET /api/:id/votes
 * @desc GET Event's Votes (Still in the Works, May do Calculation for Votes)
 * @access Public
 */
// router.get('/:id/votes', (req, res, next) => {
//     Event.findById(req.params.id)
//         .then(event => {
//             res.json(event.votes);
//             //calc votes
//             //check the timeStamp
//         })
// });

/**
 * @route POST /api/:event_id/votes
 * @desc Sends a new Vote within the Event
 * @access Public
 */
router.post('/:event_id/votes', auth, async (req, res) => {
    try {
        let event = await Event.findById(req.params.event_id);

        let userVoteCount = 0;
        event.votes.forEach(function (vote) {
            if (vote.voterName == req.user.username) {
                userVoteCount++;
            }
        });

        //Check is User has voted more than the limit 
        if (userVoteCount >= 3) {
            console.log(req.user.username + " has vote too many times.....vote cancelled");
            res.json({ success: false });
        } else {

            //console.log(req.body.venue)
            const vote = {
                voterName: req.user.username,
                venue: req.body.venue,
                _id: new mongoose.Types.ObjectId
            }
            event.votes.push(vote);
            res.json(event.votes);
            await event.save();
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error with Sending Vote");
    }

});

/**
 * @route POST /api/
 * @desc
 * @access
 */

//Post Participant into Participant List
router.post('/:event_id/participants/:participant_username', async (req, res) => {
    try {
        const event = await Event.findById(req.params.event_id);
        if (event) {
            event.participants.push(req.params.participant_username)
            await event.save();
            res.json(event);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error failed to add friend")
    }
});



//POST New Venue to Event
/**
 * @route POST /api/events/:event_id/venues
 * @desc Add Venue to Event
 * @access Public
 */
router.post("/:event_id/venues", (req, res, next) => {

    const newVenue = {
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        location: req.body.location,
        link: req.body.link,
        image: req.body.image,
        price: req.body.price,
        rating: req.body.rating
    };

    Event.findById(req.params.event_id)
        .then(event => {
            event.venueList.push(newVenue);
            event.save().then(() => res.json(event));
        })
        .catch(err => res.status(404).json({ error: 'not working...' }));
});


//OLD ROUTES-------------------------------------------------------------------


/**
 * @route PUT /api/events/:id/deadlineDate
 * @desc Change Event's Deadline Time (Untested
 * @access Private
 */
router.put('/:id/deadlineDate', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            event.deadlineTime = req.body.deadlineTime;
            event.save().then(() => res.json({ deadlineTime: 'change successful!!' }));
        })
        .catch(err => res.status(404).json({ error: false }));
});


/**
 * @route PATCH /api/events/finalEvent
 * @desc Add Vote to Event
 * @access Private
 */
router.patch('/:event_id/finalEvent', async (req, res) => {
    let event = await Event.findById(req.params.event_id);
    let currDate = new Date().getTime();
    let deadlineDate = new Date(event.deadlineTime).getTime();

    //console.log("FLAG FIRING FINAL EVENT ENDPOINT!!!");
    //console.log("Currend Date > deadline Date ", currDate > deadlineDate);
    if (currDate > deadlineDate) {

        //console.log("Processing Final Event FLAG");
        //calculate the FINAL EVENT from the votes

        let dict = {}
        let finalEvent = {
            numVotes: 0,
            venue: null
        }

        for (let i = 0; i < event.votes.length; i++) {

            if (dict[event.votes[i].venue.id] === NaN || dict[event.votes[i].venue.id] === undefined) {
                dict[event.votes[i].venue.id] = 1;
                if (finalEvent.venue === null) {
                    finalEvent.venue = event.votes[i].venue
                    finalEvent.numVotes = 1
                }
            } else {
                dict[event.votes[i].venue.id] += 1
                if (finalEvent.numVotes < dict[event.votes[i].venue]) {
                    finalEvent.numVotes = dict[event.votes[i].venue]
                    finalEvent.venue = event.votes[i].venue
                }
            }
            //console.log(dict[event.votes[i].venue.id]);
        }
        //console.log(dict);

        event.finalEvent = finalEvent.venue;

        //set active to false
        event.active = false;
        res.json(event);

        //save the updates to the event to the database
        await event.save();
    }
    // else {
    //     console.log("Fail: Current time is still BEFORE the deadlineTime");
    //     res.json({ success: false });
    // }
});


/**
 * @route DELETE /api/events/:owner_id
 * @desc DELETE User and Events (This WILL HAVE TO BE MOVED TO USER ROUTE INSTEAD
 * @access Private
 */
router.delete('/:owner_id', async (req, res) => {
    try {
        await Event.findByIdAndDelete({ owner: req.user.id });
        await User.findOne({ _id: req.user.id })
        res.json({ msg: 'Deleted User and User Events' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error on Delete User route' })
    }
});


/**
 * @route DELETE /api/events/:id
 * @desc Remove Event
 * @access Public
 */
router.delete('/:id', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => event.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ error: err.message }));
});


/**
 * @route DELETE /api/:id/:venueId
 * @desc Remove Venue from Event
 * @access Private
 */
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