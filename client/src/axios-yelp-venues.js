import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses/search'
});

export default instance;