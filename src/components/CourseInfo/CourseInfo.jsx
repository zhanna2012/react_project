import {React, useState, useEffect} from 'react';
import { Link, useParams  } from 'react-router-dom';
import {getCourses} from '../../store/selectors';

import { useSelector } from "react-redux";



import './CourseInfo.css';


function CourseInfo(props) {
    const {courseId} = useParams();

    const courses = useSelector(getCourses);

    const [result, setResult] = useState('');


    useEffect(() => {
        const course = courses.filter((el) => {
            if(el.id === courseId) {
                return el;
            }
            return 0;
    });
        const curCourse = course[0];
        const rez = <>
        <div className='info__block'>
            <div className='info__wrapper'>
                <div className='info__title__block'>
                    <Link to = '/courses' className='info__link'>&#8656; Back to courses</Link>
                   <h3 className = "info__title">{curCourse.title}</h3>
                </div>
                <div className = "info__blocks">
                    <div className='info__description'>{curCourse.description}</div>
                    <div className='info__additional'>
                      <div className="info__additional_item"><span>Id:  </span>{curCourse.id}</div>
                      <div className="info__additional_item"><span>Authors:  </span>{props.getAuthor(curCourse.authors)}</div>
                      <div className="info__additional_item"><span>Duration:  </span>{props.durationFormat(curCourse.duration)}</div>
                      <div className="info__additional_item"><span>Created:  </span>{props.dateFormat(curCourse.creationDate)}</div>
                    </div>
                </div>

            </div>
        </div>
        </>
        setResult(rez);
        console.log('view')
    }, [courses, courseId, props])

  return (
      <>
      {result}
      </>
    );
}

export default CourseInfo;
