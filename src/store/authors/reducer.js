import {GET_AUTHORS, ADD_AUTHORS} from './actionTypes';

const authorsInitialState = {
    authors: [],
}

export const authorsReducer = (state = authorsInitialState, action) =>  {
    switch (action.type) {
        case GET_AUTHORS:
            return {...state, authors: [...action.payload]};
        case ADD_AUTHORS:
            return {...state, authors: [...state.authors, action.payload]};
        default:
            return state;
    }
};