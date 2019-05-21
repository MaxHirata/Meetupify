const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require('../../models/User');
//const Event = require('../../models/Venue');
//const Vote = require('../../models/Vote');

router.get("/", (req, res, next) => {
  User.find().then(users => res.json(users));
});

router.post("/", (req, res, next) => {
  const newUser = new User({
    _id: mongoose.Schema.Types.ObjectId,
    email: req.body.email,
    password: req.body.password,
    events: []
  });

  newUser.save().then(user => res.json(user));
});

router.delete("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


/**
 * @route DELETE api/venues/:id
 * @desc Delete a Venue
 * @access Public
 */
router.delete('/:id', (req, res) => {
  Venue.findById(req.params.id)
    .then(venue => venue.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

//implemented with encryption and security verifications
/*
router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({ error: err });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });

              user.save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  });
  
  router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({ message: "Auth failed" });
          }

          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  */




module.exports = router;