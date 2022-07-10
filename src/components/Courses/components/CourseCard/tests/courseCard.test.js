import { render, screen } from '@testing-library/react';
import CourseCard from '../CourseCard';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {rootReducer} from '../../../../../store/index';
import {mockedAuthorsList, mockedCoursesList, minInHour} from '../../../../../constants';

import {getAuthorsAction} from '../../../../../store/authors/actionCreators'


const mockedState = {
  user: {
  isAuth: true,
  name: 'Test Name',
  },
  courses: mockedCoursesList,
  authors: mockedAuthorsList,
 };

 function renderWithRedux(ui) {
  const store = createStore(rootReducer, mockedState);
  store.dispatch(getAuthorsAction(mockedState.authors))
  return render(<Provider store={store}>{ui}</Provider>);
}
const curComponent = <CourseCard  
title = {mockedState.courses[0].title}
id = {mockedState.courses[0].id}
key={mockedState.courses[0].id} 
description = {mockedState.courses[0].description} 
authors = {mockedState.courses[0].authors}
duration = {mockedState.courses[0].duration}
creationDate = {mockedState.courses[0].creationDate}/>;

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
function getAuthor(arrId) {
  let strAuthor = [];
  mockedState.authors.forEach(element => {
     arrId.forEach(item => {
         if(element.id === item) {
             strAuthor.push(element.name);
         }
     })
  });
  return strAuthor.join(',');
}


describe('TEST courseCard', () => {
    test('CourseCard should display title', () => {
        renderWithRedux(curComponent);
        expect(screen.getByTestId('title')).toBeInTheDocument();  
        expect(screen.getByTestId('title')).toHaveTextContent(mockedState.courses[0].title);  
        });
    test('CourseCard should display description', () => {
        renderWithRedux(curComponent);
        expect(screen.getByTestId('description')).toBeInTheDocument();  
        expect(screen.getByTestId('description')).toHaveTextContent(mockedState.courses[0].description.replaceAll('\n','').replace(/\s{2,}/g, ' '));  
      });
    test('CourseCard should display duration in the correct format', () => {
        renderWithRedux(curComponent);
        expect(screen.getByTestId('duration')).toBeInTheDocument();  
        expect(screen.getByTestId('duration')).toHaveTextContent(durationFormat(mockedState.courses[0].duration));  
      });
    test('CourseCard should display authors list', () => {
       renderWithRedux(curComponent);
       expect(screen.getByTestId('authors')).toBeInTheDocument();
       expect(screen.getByTestId('authors')).toHaveTextContent(getAuthor(mockedState.courses[0].authors));  
      });
    test('CourseCard should display created date in the correct format', () => {
        renderWithRedux(curComponent);
        expect(screen.getByTestId('creationDate')).toBeInTheDocument();  
        expect(screen.getByTestId('creationDate')).toHaveTextContent(mockedState.courses[0].creationDate.split('/').join('.'));  
      });
})

