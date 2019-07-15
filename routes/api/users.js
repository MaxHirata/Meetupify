const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Event = require('../../models/Event');


/**
 * @route POST /api/user/
 * @desc Register New User
 * @access Public
 */
router.post('/', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please Input a Valid Email').isEmail(),
  check('password', 'Please input a password with 6 or more characters').isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body

    try {

      //See if user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        username,
        email,
        password
      });

      //Encrypt Password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user._id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token })
        });

      //Return jsonwebtoken

      //res.send('User Registered');

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }


  }
);


/**
 * @route GET /api/user/
 * @desc GET All Users (Used Only in Testing, WIll DELETE LATER)
 * @access Public
 */
router.get("/", (req, res, next) => {
  User.find().then(users => res.json(users));
});

//Delete User and All User's Events

/**
 * @route DELETE /api/user/
 * @desc DELETE Existing User
 * @access Private
 */
router.delete('/', auth, async (req, res) => {
  try {
    console.log(req.user);
    await Event.find({ owner: req.user.id }).remove();
    await User.findOne({ _id: req.user.id }).remove();
    res.json({ msg: 'Deleted User and User Events' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error on Delete User route' })
  }
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


module.exports = router;
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




