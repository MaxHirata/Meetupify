const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');


const client = yelp.client('j61WKiZTg6nb72TbDbELqGZAJ4-WNSJ_u3TCuGvWYepRn61-HP7grxlwTM1B9zeQ45un9AZs4n6iGwB9tn5rxVdBMLiIIzDfV54--ff6UB45nllFhM06lxmZxlhZXHYx');

/**
 * @route GET /api/yelp/
 * @desc GET Venue Search Results from Yelp by Location and Terms
 * @access Public
 */
router.get('/:term/:location', (req, res) => {
    client.search({
        term: req.params.term,
        location: req.params.location
    }).then(yelpResponse => res.json(yelpResponse.jsonBody.businesses))
        .catch(e => res.status(404).json({ error: "NOT FOUND" }))
});

module.exports = router;