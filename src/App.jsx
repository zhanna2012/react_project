import {React, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import CourseFrom from './components/CourseFrom/CourseFrom';

import {minInHour} from './constants'

import {getAuthors} from './store/selectors';
import { useSelector, useDispatch } from "react-redux";
import {fetchAuthors, fetchCourses} from './asyncActions/fetchActions'



function App() {

 const authors = useSelector(getAuthors);
 const dispatch = useDispatch();

  function durationFormat(minutes) {
    let hours = (minutes / minInHour);
    let rhours = Math.floor(hours).toString();
    let min = (hours - rhours) * minInHour;
    let rminutes = Math.round(min).toString();
    let rezHour = '';
    let rezMin = '';
    if(rhours.length === 1) {
        rezHour = '0' + rhours;
    } else {
        rezHour = rhours;
    }
    if(rminutes.length === 1) {
        rezMin = '0' + rminutes;
    } else {
        rezMin = rminutes;
    }
    
    return rezHour + ':' + rezMin +  ' hours';
 }
 function dateFormat(date) {
     return date.split('/').join('.');
 }

function getAuthor(arrId) {
    let strAuthor = [];
    authors.forEach(element => {
       arrId.forEach(item => {
           if(element.id === item) {
               strAuthor.push(element.name);
           }
       })
    });
    return strAuthor.join(',');
}
 useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchCourses());
  },[dispatch]);


  return (
    <Router>
       <Routes>
          <Route exact path='/' element = {<Header fetchStatus = 'home'/>}/>
          <Route exact path='/login' element = {<Header fetchStatus = 'auth'/>}/>
          <Route exact path='/register' element = {<Header fetchStatus = 'auth'/>}/>
          <Route exact path='/courses' element = {<Header fetchStatus = 'entered'/>}/>  
          <Route exact path='/courses/:courseId' element = {<Header fetchStatus = 'entered'/>}/>
          <Route exact path='/courses/update/:courseId' element = {<Header fetchStatus = 'entered'/>}/>
        </Routes>
        <Routes>
          <Route exact path='/' element = {<Courses />}/>
          <Route exact path='/courses' element = {<Courses />}/>
          <Route exact path='/login' element = {<Login />}/>
          <Route exact path='/register' element = {<Registration />}/>
          <Route exact path='/courses/add' element = {
              <PrivateRoute >
               <CourseFrom 
                durationFormat = {durationFormat}
               />
              </PrivateRoute>
          }/>
          <Route exact path='/courses/update/:courseId' element = {
              <PrivateRoute >
               <CourseFrom 
                durationFormat = {durationFormat}
                getAuthor = {getAuthor}
               />
              </PrivateRoute>
          }/>
          <Route exact path='/courses/:courseId' element = {<CourseInfo 
          durationFormat = {durationFormat}
          dateFormat = {dateFormat}
          getAuthor = {getAuthor}
          />}/>
        </Routes>
    </Router>
    );
}
export default App;
