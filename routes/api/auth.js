const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator/check')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');

const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
    try {
        console.log(req.user.id);
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post(
    '/',
    [
        check('email', 'Please Input a Valid Email').isEmail(),
        check('password', 'Password is REQUIRED').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }

        const { email, password } = req.body

        try {

            //See if user exists
            let user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Check if password matches
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const payload = {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
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

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error2');
        }


    }
);

module.exports = router;