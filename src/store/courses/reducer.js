import {GET_COURSES, ADD_COURSE, DELETE_COURSE, UPDATE_COURSE} from './actionTypes';

const coursesInitialState = {
    courses: []
}
export const coursesReducer = (state = coursesInitialState, action) =>  {
    switch (action.type) {
        case GET_COURSES:
            return {...state, courses: [...action.payload]};
        case ADD_COURSE:
            return {...state, courses: [...state.courses, action.payload]};
        case DELETE_COURSE:
            return {...state, courses: state.courses.filter(course => course.id !== action.payload)};
        case UPDATE_COURSE:
            state.courses.map((post) => (
                post.id === action.payload.id
                  ? { ...state.courses, text: 'other text' }
                  : post
              ));
            return {...state, courses: state.courses.map((course) => (
                course.id === action.payload.id
                  ? { ...course, 
                title: action.payload.title,
                description: action.payload.description,
                creationDate: action.payload.creationDate,
                duration: action.payload.duration,
                authors: action.payload.authors
                    }
                  : course
              ))};
        default:
            return state;
    }
};
