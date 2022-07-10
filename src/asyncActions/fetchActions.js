import {getCoursesAction, deleteCourseAction, updateCourseAction} from '../store/courses/actionCreators';
import {getAuthorsAction} from '../store/authors/actionCreators'
import {getUserAction} from '../store/user/actionCreators';

import axios from 'axios';


export const fetchUser = (user) => {
  return async function(dispatch) {
  await axios.get('http://localhost:4000/users/me', {
    headers: {
      'Authorization' : localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
  }).then((result) => {
      dispatch(getUserAction(result.data.result));
    
  })
  .catch((err) => {
    if(err.response.statusText === 'Unauthorized') {
      console.log('Unauthorized');
    }
  });
}
}

export const fetchCourses = () => {
    return async function(dispatch) {
    await axios.get('http://localhost:4000/courses/all', {
     headers: {
        'Content-Type': 'application/json',
    }
    }).then((result) => {
      console.log('fetched courses')
      console.log(result.data.result);
      dispatch(getCoursesAction(result.data.result));
    }).catch((err) => console.log(err.response));
  }
}

export const deleteCourseFetch = (id) => {
  return async function(dispatch) {
    await axios.delete(`http://localhost:4000/courses/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : localStorage.getItem('token')
    },
  }).then(() => {
    dispatch(deleteCourseAction(id));
  })
  .catch((err) => console.log('Delete course error' + err));
}
}
export const updateCourseFetch = (course) => {
  return async function(dispatch) {
    await axios.put(`http://localhost:4000/courses/${course.id}`, JSON.stringify(course),{
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : localStorage.getItem('token')
    }
  }
  ).then(() => {
    dispatch(updateCourseAction(course));
  })
  .catch((err) => console.log(err));
}
}


export const fetchAuthors = () => {
  return async function(dispatch) {
  await axios.get('http://localhost:4000/authors/all', {
   headers: {
      'Content-Type': 'application/json',
  }
  }).then((result) => {
    console.log('fetched authors')
    console.log(result.data.result);
    dispatch(getAuthorsAction(result.data.result));
  }).catch((err) => console.log('Fetch authors error' + err))
 }
}
