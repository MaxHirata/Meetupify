const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

//Event Model
const User = require('../../models/User');
const Event = require('../../models/Event');


//GET User's Events
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

//GET EVENT(S) BY OWNER ID -- OLD
// router.get('/:owner_id', async (req, res) => {
//     try {
//         const events = await Event.find({ owner: req.params.owner_id }).populate('owner', ['eventName', 'deadlineTime']);

//         if (!events) return res.status(400).json({ msg: 'This User Has No EVENTS....' });
//         res.json(events);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error4');
//         if (err.kind == 'ObjectId') {
//             return res.status(400).json({ msg: 'Events NOT FOUND' });
//         }
//     }
// });

//GET USER EVENTS
router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find({ owner: req.user.id }).populate('owner', ['eventName', 'deadlineTime']);
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server ERROR: GET USER EVENTS');
    }
});
// //GET Events old
// router.get("/", (req, res, next) => {
//     Event.find()
//         .then(events => res.json(events));
// });

//GET Event By Id
router.get('/:id', (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(404).json({ success: false }));
});

//GET Event Venues
router.get('/:event_id/venues', (req, res, next) => {
    console.log("Insie get Event Venue Route");
    Event.findById(req.params.event_id)
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
router.post("/", [auth, [
    check('eventName', 'Event Name is required').not().isEmpty(),
    check('deadlineTime', 'Deadline Time is Required').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        //Build new Event Object
        const eventFields = {
            owner: req.user.id,
            eventName: req.body.eventName,
            deadlineTime: req.body.deadlineTime,
            participants: [req.user.username],
            finalEvent: null
        };


        try {

            // let event = await Event.findOne({ owner: req.user.id });

            // if (event) {
            //     //update
            //     console.log('inside update try');
            //     event = await Event.findOneAndUpdate(
            //         { owner: req.user.id },
            //         { $set: eventFields },
            //         { new: true }
            //     );
            //     console.log(event);
            //     return res.json(event);
            // };

            //Create
            let event = new Event(eventFields);

            await event.save();
            res.json(event);


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error3");
        }

        //console.log(newEvent);
        //res.send('Inside POST New Events');
        //newEvent.save().then(event => res.json(event));
    }
);

//Post Friend(s) into FriendList
router.post('/:event_id/participants', async (req, res) => {


    try {
        const event = await Event.findById(req.params.event_id);
        if (event) {
            //APPEND THE LIST OF PARTICIPANTS FROM BODY TO event.participantList
            //event.participantList
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error add friend")
    }
});

//POST New Venue to Event
router.post("/:event_id/venues", (req, res, next) => {

    const newVenue = {
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        location: req.body.location,
        link: req.body.link,
        image: req.body.image,
        price: req.body.price,
        rating: req.body.price
    };

    Event.findById(req.params.event_id)
        .then(event => {
            event.venueList.push(newVenue);
            event.save().then(() => res.json(event));
        })
        .catch(err => res.status(404).json({ error: 'not working...' }));
});


//OLD ROUTES-------------------------------------------------------------------

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



//POST New Vote to Event
router.post('/:id/vote', (req, res, next) => {
    const selectedVenue = {
        _id: req.body.id,
        name: req.body.name,
        location: req.body.location,
        link: req.body.link,
        image: req.body.image,
        price: req.body.price,
        rating: req.body.rating
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

//Delete User and All User's Events
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