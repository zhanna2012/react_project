import {GET_AUTHORS, ADD_AUTHORS} from './actionTypes';

export const getAuthorsAction = (payload) => ({type: GET_AUTHORS, payload});

export const addAuthorsAction = (payload) => ({type: ADD_AUTHORS, payload});

