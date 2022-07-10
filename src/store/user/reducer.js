import {SET_USER, GET_USER} from './actionTypes';

const userInitialState = {
    isAuth: false,
    name: '',
    email: '',
    token: '',
    role: ''
}

export const userReducer = (state = userInitialState, action) =>  {
    switch (action.type) {
        case SET_USER:
            return {...state, 
            isAuth: action.payload.isAuth,
            name: action.payload.email === 'admin@email.com' ? 'Admin' : action.payload.name,
            email: action.payload.email,
            token: action.payload.token,
            role: action.payload.email === 'admin@email.com' ? 'admin' : 'user' 
            };
        case GET_USER: 
            return {...state, ...action.payload};
        default:
            return state;
    }
};