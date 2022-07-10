import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";

import { v4 as uuidv4 } from 'uuid';


import {enterAuthor, 
    authorName, 
    addAuthor, 
    enterDuration, 
    duration, 
    deleteAuthor, 
    createAuthor, 
    createCourse, 
    title, 
    enterTitle, 
    updateCourse} from '../../constants';

import './CourseFrom.css';

import React, {useState, useEffect, useRef} from "react";
import { useNavigate, useLocation, useParams} from 'react-router-dom';
import { useDispatch } from "react-redux"; 
import {addCourseAction} from '../../store/courses/actionCreators';

import {getCourses, getAuthors} from '../../store/selectors';
import { useSelector } from "react-redux";
import {updateCourseFetch, fetchCourses, fetchAuthors} from '../../asyncActions/fetchActions'
import {addAuthorsAction} from '../../store/authors/actionCreators'
import axios from "axios";


function CourseFrom(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {courseId} = useParams();
    const flag = location.pathname === `/courses/update/${courseId}`;

    const courses = useSelector(getCourses);
    const authorsFind = useSelector(getAuthors);


    const curCourse = flag ? courses.filter((el) => el.id === courseId) : [];
    const curAuthors = flag ? getArrAuthors() : [];

    function getAuthor(arrId) {
        let strAuthor = [];
        authorsFind.forEach(element => {
           arrId.forEach(item => {
               if(element.id === item) {
                   strAuthor.push(element.name);
               }
           })
        });
        return strAuthor;
    }

    function getArrAuthors() {
        const auth = [];
        const curAuthorsName = getAuthor(curCourse[0].authors);
        const curAuthorsId = curCourse[0].authors;
        for(let i = 0; i < curAuthorsId.length; i++){
            auth.push({
                id: curAuthorsId[i],
                name: curAuthorsName[i]
            });
        }
        return auth;
    }

    const [newtitle, setTitle] = useState(flag ? curCourse[0].title : '');
    const [description, setDescription] = useState(flag ? curCourse[0].description: '');
    const [newduration, setDuration] = useState(flag ? curCourse[0].duration : '');
    const [newAuthor, setnewAuthor] = useState('');
    const [request, setRequest] = useState();
    const [requestCourse, setrequestCourse] = useState();



    const [formatduration, setformatDuration] = useState(0);


    const [dirtytitle, setdirtyTitle] = useState(false);
    const [dirtydescription, setdirtyDescription] = useState(false);
    const [dirtynewduration, setdirtyDuration] = useState(false);
    const [newdirtyAuthor, setdirtynewAuthor] = useState(false);

    const [arrAuthors, setarrAuthors] = useState([]);
    const [authorsView, setauthorsView] = useState();


    const [authorsViewCourse, setauthorsViewCourse] = useState();

    const [arrAuthorsCourse, setarrAuthorscourse] = useState(flag ? [...curAuthors] : []);

   


    const [dirtytitleError, setdirtyTitleError] = useState('Input can not be empty');
    const [dirtydescriptionError, setdirtyDescriptionError] = useState('Input can not be empty');
    const [dirtynewdurationError, setdirtyDurationError] = useState('Input can not be empty');
    const [newdirtyAuthorError, setdirtynewAuthorError] = useState('Input can not be empty');

    const authorsAdd = useRef([])
    const authors = useRef([]);
    const authorsCourse = useRef(flag ? [...curAuthors] : []);

    const author = {
        name: newAuthor
    }

    const courseUpdate = {
    id: flag && curCourse[0].id,
    title: newtitle,
    description: description,
    creationDate: formatDate(new Date()),
    duration: parseInt(newduration),
    authors: getId(arrAuthorsCourse)
   }
   const courseAdd = {
    title: newtitle,
    description: description,
    creationDate: formatDate(new Date()),
    duration: parseInt(newduration),
    authors: getId(arrAuthorsCourse)
   }
   
   function getId(obj) {
    let arrId = obj.map((el) => {
        return el.id;
    })
    return arrId;
   }

   function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
  
    return dd + '/' + mm + '/' + yy;
  }
  
   
    useEffect(() => {
        const rezAdd = arrAuthors.map((item) =>
        <div key={uuidv4()} className="added__author">
        <p className="added__name">{item.name}</p>
        <Button id={item.id} buttonText = {addAuthor} 
        onClick = {addToCourse}/>
        </div>);
        if(rezAdd.length === 0) {
            setauthorsView(<div className = 'error'>No authors found</div>);
          } else {
            setauthorsView(rezAdd);
          }
    },[request, arrAuthors])


    const deleteFromCourse = ((e) => {
        e.preventDefault();
        let id = e.target.id;
        let newCourseAuthors = [];
        authorsCourse.current.filter((item) => {
            if(item.id !== id) {
                newCourseAuthors.push(item);
                return item;
            }
            return 0;
        })
        authorsCourse.current = newCourseAuthors;
        setarrAuthorscourse([...authorsCourse.current]);
        setrequestCourse(uuidv4());
    });


    useEffect(() => {
        dispatch(fetchCourses());
        const rezAddCourse = arrAuthorsCourse.map((item) =>
        <div key={uuidv4()} className="added__author">
        <p className="added__name">{item.name}</p>
        <Button id = {item.id} buttonText = {deleteAuthor} 
        onClick = {deleteFromCourse}/> </div>);
        if(rezAddCourse.length === 0) {
            setauthorsViewCourse(<div className = 'error'>No authors found</div>);
          } else {
            setauthorsViewCourse(rezAddCourse);
          }
    }, [requestCourse, arrAuthorsCourse, dispatch])


    function addToCourse(e) {
        e.preventDefault();
        let id = e.target.id;
        let courseAuthor = {};
        authors.current.filter((item) => {
            if(item.id === id) {
                courseAuthor = item;
                return item;
            }
            return 0;
        })
        authorsCourse.current.push(courseAuthor);
        setarrAuthorscourse(authorsCourse.current);
        setrequestCourse(uuidv4());
    }
    useEffect(() => {
        dispatch(fetchAuthors());
        dispatch(fetchCourses());
    }, [request, requestCourse, dispatch])

   
    async function addAuthorClick(e) {
        e.preventDefault();
        if(newdirtyAuthorError === '') {
            axios.post('http://localhost:4000/authors/add', JSON.stringify(author), {
                headers: {
                   'Authorization' : localStorage.getItem('token'),
                   'Content-Type': 'application/json',
               }
               }).then((result) => {
                 console.log(result.data.result);
                 dispatch(addAuthorsAction(result.data.result));
                 authors.current.push(result.data.result);
                 authorsAdd.current.push(result.data.result);
                 setarrAuthors(authorsAdd.current);
                 setRequest(uuidv4());
                 setnewAuthor(''); 
              })
              .catch((err) => console.log(err));
        }
    }


    const validation = (e) => {
        switch (e.target.name) {
            case 'title':
                if(newtitle.length <= 2) {
                    setdirtyTitleError('Title should be more then 2 characters');
                    setdirtyTitle(true);
                } else {
                    setdirtyTitleError('');
                    setdirtyTitle(false);
                }
                break;
            case 'description':
                if(description.length <= 2) {
                    setdirtyDescriptionError('Description should be more then 2 characters');
                    setdirtyDescription(true);
                } else {
                    setdirtyDescriptionError('');
                    setdirtyDescription(false);
                }
                break;
            case 'duration':
                if(newduration <= 0) {
                    setdirtyDurationError('Duration should be more then 0');
                    setdirtyDuration(true);
                } else {
                    setdirtyDurationError('');
                    setdirtyDuration(false);
                }
                break;
            case 'newAuthor':
                if(newAuthor.length <= 2) {
                    setdirtynewAuthorError('Author should be more then 2 characters');
                    setdirtynewAuthor(true);
                } else {
                    setdirtynewAuthorError('');
                    setdirtynewAuthor(false);
                }
                break;
            default:
                break;
    }
}


    const blurHandler = (e) => {
        switch (e.target.name) {
        case 'title':
            if(newtitle.length === 0) {
                setdirtyTitle(true);
            }
            break;
        case 'description':
            if(description.length === 0) {
                setdirtyDescription(true);
            }
            break;
        case 'duration':
            if(newduration.toString().length === 0) {
            setdirtyDuration(true);
            }
            break;
        default:
            break;
        }
    }

    function handleClickCreate(e) {
        e.preventDefault();
        if(dirtytitleError !== '') {
            alert('Enter correct title');
        } else if(dirtydescriptionError !== ''){
            alert('Enter correct descriprion');
        } else if(dirtynewdurationError !== ''){
            alert('Enter correct duration');
        } else if(arrAuthorsCourse.length === 0){
            alert('Enter at least one author');
        } else {
            axios.post('http://localhost:4000/courses/add', JSON.stringify(courseAdd), {
                headers: {
                   'Authorization' : localStorage.getItem('token'),
                   'Content-Type': 'application/json',
               }
               }).then((result) => {
                 console.log(result.data.result);
                 dispatch(addCourseAction(result.data.result));
                 dispatch(fetchAuthors());
                 dispatch(fetchCourses());
                 navigate('/courses');
              })
              .catch((err) => console.log(err));
        }
    }



    function handleClickUpdate(e) {
        e.preventDefault();
        if(dirtytitleError !== '') {
            alert('Enter correct title');
        } else if(dirtydescriptionError !== ''){
            alert('Enter correct descriprion');
        } else if(dirtynewdurationError !== ''){
            alert('Enter correct duration');
        } else if(arrAuthorsCourse.length === 0){
            alert('Enter at least one author');
        } else {
            dispatch(updateCourseFetch(courseUpdate));
            console.log(courseUpdate);
            dispatch(fetchAuthors());
            dispatch(fetchCourses());
            navigate('/courses');
        }
    }
        return (
            <>
        <form className = "add_course_box" data-testid = 'course-form'>
            {flag ? 
            <Button buttonText = {updateCourse} 
            onClick = {handleClickUpdate}
            type = "submit"/> 
        : <Button buttonText = {createCourse} 
        onClick = {handleClickCreate}
        type = "submit"/>}
                <div className="title">
                {(dirtytitle && dirtytitleError) &&     
                <React.Fragment>
               <div className="error">{dirtytitleError}</div>    
               </React.Fragment>}
            <Input placeholdetText = {enterTitle} 
                    onChange = {(e) => {
                        setTitle(e.target.value);
                        validation(e);
                    }} 
                    labelText={title}
                    name = 'title'
                    onBlur = {e => blurHandler(e)}
                    value={newtitle}
                    type = 'text'/>
            
            </div>
            <div className="description__box">
                <label className="desc__title">Description</label>
                {(dirtydescription && dirtydescriptionError) &&     
                <React.Fragment>
               <div className="error">{dirtydescriptionError}</div>    
               </React.Fragment>}
                <textarea className="description" 
                onChange = {(e) => {
                    setDescription(e.target.value);
                    validation(e);
                }} 
                placeholder="Enter descriprion"
                name='description'
                onBlur = {e => blurHandler(e)}
                value={description}
                />
            </div>
            <div className="add_info_box">
                <div className="box">
                    <h3 className = "add__title">Add author</h3>
                    {(newdirtyAuthor && newdirtyAuthorError) &&     
                <React.Fragment>
               <div className="error">{newdirtyAuthorError}</div>    
               </React.Fragment>}
                    <Input placeholdetText = {enterAuthor} 
                    onChange = {(e) => {
                        setnewAuthor(e.target.value);
                        validation(e);
                    }} 
                    labelText={authorName}
                    name = 'newAuthor'
                    onBlur = {e => blurHandler(e)}
                    value={newAuthor}
                    type = 'text'/>
                     <Button buttonText = {createAuthor} 
                       onClick = {addAuthorClick}/>
                </div>
                <div className="box">
                    <h3 className = "add__title">Authors</h3>
                       {authorsView}
                </div>
                <div className="box">
                    <h3 className = "add__title">Duration</h3>
                    {(dirtynewduration && dirtynewdurationError) &&     
                <React.Fragment>
               <div className="error">{dirtynewdurationError}</div>    
               </React.Fragment>}
                    <Input placeholdetText = {enterDuration} 
                    onChange = {(e) => {
                        setDuration(e.target.value);
                        validation(e);
                        setformatDuration(props.durationFormat(e.target.value));
                    }} 
                    labelText={duration}
                    name = 'duration'
                    onBlur = {e => blurHandler(e)}
                    value={newduration}
                    type='number'/>
                    <div className="duration__rez">Duration: <span>{formatduration}</span></div>
                </div>
                <div className="box">
                    <h3 className = "add__title">Course authors</h3>
                    {authorsViewCourse}
                </div>
            </div>
        </form>
        </>
      );
  }
export default CourseFrom;

