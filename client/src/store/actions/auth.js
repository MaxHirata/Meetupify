import * as actionTypes from './actionTypes';
import axios from 'axios';
import { setAlert } from './alerts';
import { setAuthToken } from '../../shared/utilities';


//Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    console.log('loading new User in actions');

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: actionTypes.USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: actionTypes.AUTH_ERROR
        });
    }
}


//Login User
export const loginUser = (loginData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //const newUser = { username: name, email: email, password: password };

    const body = JSON.stringify(loginData);

    try {
        const res = await axios.post('/api/auth', body, config);
        console.log(res.data);
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Login Successful! Welcome Back!', 'success'));
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        //
        dispatch({
            type: actionTypes.LOGIN_FAIL
        });
    }
}

//Logout User
export const logout = () => dispatch => {
    dispatch({
        type: actionTypes.LOGOUT
    })
}

//Register user
export const register = (newUser) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //const newUser = { username: name, email: email, password: password };

    const body = JSON.stringify(newUser);

    try {
        const res = await axios.post('/api/user', body, config);
        console.log(res.data);
        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        //
        dispatch({
            type: actionTypes.REGISTER_FAIL
        });
    }
}