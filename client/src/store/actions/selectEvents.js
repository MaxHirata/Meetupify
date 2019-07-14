import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getAllEvents = () => dispatch => {

    axios.get(`/api/events/`)
        .then(res => dispatch({
            type: actionTypes.GET_ALL_EVENTS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err);
        });
}

export const getParticipatingEvents = () => dispatch => {
    axios.get('/api/events/participatingEvents')
        .then(res => dispatch({
            type: actionTypes.GET_PARTICIPATING_EVENTS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err)
        });
}

// export const getParticipatingEvents = () => async dispatch => {

//     const res = await axios.get('/api/events/participatingEvents')

//     console.log("Inside getParticipatingEvnets Action")
//     console.log(res)
//     try {
//         dispatch({
//             type: actionTypes.GET_PARTICIPATING_EVENTS,
//             payload: res.data
//         })
//     } catch (err) {
//         console.error(err.message)
//     }
// }

//TODO: Still have to Setup API Route
// export const getUserEvents = (id) => async dispatch => {
//     try {
//         const res = await axios.get(`/api/events/user/${id}`);

//         dispatch({
//             type: actionTypes.GET_USER_EVENTS,
//             payload: res.data
//         });
//     } catch (err) {
//         const errors = err.response.data.errors;

//         if (errors) {
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//         }
//     }
// }

//TODO Still have to Build and Setup API Route
// export const getParticipatingEvents = (username) => async dispatch => {
//     try {
//         const res = await axios.get(`/api/events/participating/${username}`);

//         dispatch({
//             type: actionTypes.GET_PARTICIPATING_EVENTS,
//             payload: res.data
//         });
//     } catch (err) {
//         const errors = err.response.data.errors;

//         if (errors) {
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//         }
//     }
// }

export const selectEvent = (event_id) => {
    console.log("inside selectEvent" + event_id);
    return {
        type: actionTypes.SELECT_EVENT,
        payload: event_id
    }
}

export const createEvent = (eventData) => async dispatch => {
    console.log("Inside Create Create Event Action");
    const body = JSON.stringify(eventData);

    await axios.post('/api/events/', eventData);

    try {
        dispatch({
            type: actionTypes.CREATE_EVENT
        })
    } catch (err) {
        console.error(err.message);
    }
}

export const deleteEvent = (event_id) => {
    return {
        type: actionTypes.DELETE_EVENT,
        payload: event_id
    }
}