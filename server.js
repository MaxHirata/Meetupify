const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./config/db');

const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const events = require('./routes/api/events');
const yelp = require('./routes/api/yelpVenues');

const app = express();

//body-parser middleware
app.use(bodyParser.json());

// database config
//const db = require('./config/keys').mongoURI;

//connect to MongoDB
connectDB();

// THIS IS AN OLD METHOD OF DOING THIS WITH CHAINING PROMISES
// mongoose
//     .connect(db) //Adding new mongo url
//     .then(() => console.log('MongoDB Connected...'))
//     .catch(err => console.log(err));

// Use Routes
app.use("/api/user", users);
app.use('/api/auth', auth); //this is for testing
app.use("/api/events", events);
app.use("/api/yelp", yelp);

// // Serve static assets if in production
// if (production.env.NODE_ENV === 'production') {
//     // Set static folder
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, client, build, 'index.html'));
//     });
// }


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));