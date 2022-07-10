import {GET_COURSES, ADD_COURSE, DELETE_COURSE, UPDATE_COURSE} from './actionTypes';

export const getCoursesAction = (payload) => ({type: GET_COURSES, payload});

export const addCourseAction = (payload) => ({type: ADD_COURSE, payload});

export const deleteCourseAction = (payload) => ({type: DELETE_COURSE, payload});

export const updateCourseAction = (payload) => ({type: UPDATE_COURSE, payload});