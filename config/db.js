const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log("MongoDB Connected....")
    } catch (err) {
        nconsole.error(err.message);
        // Exit Process with FAILURE
        process.exit(1)
    }
}

module.exports = connectDB;
