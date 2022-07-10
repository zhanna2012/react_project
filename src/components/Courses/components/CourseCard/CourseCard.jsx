import {React, useEffect} from 'react';
import {useSelector, useDispatch } from "react-redux";


import Button from '../../../../common/Button/Button';

import {cardBtn, minInHour, editBtn, deleteBtn} from '../../../../constants'

import {getAuthors, getUser} from '../../../../store/selectors';

import {fetchAuthors} from '../../../../asyncActions/fetchActions';



import './CourseCard.css';

function СourseCard(props) {

const dispatch = useDispatch();
const authors = useSelector(getAuthors);
const user = useSelector(getUser);

/* useEffect(() => {
    dispatch(fetchAuthors());
}, [dispatch]) */


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
 
 
  return (
      <section className = "card" data-testid="course-card">
          <div className="card__wrapper">
              <div className="main__info"> 
              <h3 className="card__title" data-testid = "title">{props.title}</h3>
              <hr/>
              <p className="card__par" data-testid = "description">{props.description}</p>
              </div>
              <div className="add_info">
                  <div className="nowrap add__row" data-testid = "authors"><span>Authors:  </span>{getAuthor(props.authors)}</div>
                  <div className="add__row" data-testid = "duration"><span>Duration:  </span>{durationFormat(props.duration)}</div>
                  <div className="add__row" data-testid = "creationDate"><span>Created:  </span>{dateFormat(props.creationDate)}</div>
                  <Button buttonText = {cardBtn} onClick = {props.onClick}/>
                  {user.role === 'admin' && <>
                  <Button buttonText = {editBtn} onClick = {props.onClickEdit}/>
                  <Button buttonText = {deleteBtn} onClick = {props.onClickDelete}/>
                  </>}
              </div>
          </div>
      </section>
    );
}
export default СourseCard;
