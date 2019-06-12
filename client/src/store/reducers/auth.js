import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: null,
    username: null,
    email: null,
    id: null,
    isAdmin: true,
    token: localStorage.getItem('token'),
    loading: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case actionTypes.REGISTER_FAIL:
        case actionTypes.AUTH_ERROR:
        case actionTypes.LOGIN_FAIL:
        case actionTypes.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case actionTypes.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.username,
                id: action.payload.id,
                email: action.payload.email,
                loading: false
            }
        default:
            return state;
    }
}