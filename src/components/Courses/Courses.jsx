import Button from "../../common/Button/Button";
import SearchBar from "./components/SearchBar/SearchBar";
import CourseCard from './components/CourseCard/CourseCard';


import {btnAddNew, title} from '../../constants';

import './Courses.css';

import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getCourses, getAuthors, getUser} from '../../store/selectors';
import {deleteCourseFetch} from '../../asyncActions/fetchActions';



function Courses() {
    const dispatch = useDispatch();
    const courses = useSelector(getCourses);
    const authors = useSelector(getAuthors);
    const user = useSelector(getUser);

    const [searchTerm, setSearchTerm] = useState('');
    const [request, setRequest] = useState();
    const [result, setResult] = useState();

    const navigate = useNavigate();


    useEffect(() => {
        const rez = courses.filter((obj) => {
            if(searchTerm === ''){
                return obj;
            } else if(obj.title.toLowerCase().includes(searchTerm.toLowerCase())){
                return obj;
            } else if(obj.id.toLowerCase().includes(searchTerm.toLowerCase())) {
                return obj;
            }
            return 0;
          }).map((obj) =>
          <CourseCard 
          key={obj.id} 
          title = {obj.title} 
          description = {obj.description} 
          authors = {obj.authors}
          duration = {obj.duration}
          creationDate = {obj.creationDate}
          onClick = {(e) => {
            e.preventDefault();
            navigate(`/courses/${obj.id}`);
          }}
          onClickDelete = {(e) => {
            e.preventDefault();
            dispatch(deleteCourseFetch(obj.id));
          }}
          onClickEdit = {(e) => {
            e.preventDefault();
            navigate(`/courses/update/${obj.id}`);
          }}/>);
        if(rez.length === 0) {
          setResult(<div className = 'error'>No courses found</div>);
        } else {
          setResult(rez);
        }
    },[searchTerm, request, courses, authors, dispatch, navigate])

    const onClick = () => {
      navigate("/courses/add");
  }
    return (
        <div className = "user__section">
                <div className="user__section_row">
                <SearchBar 
                onChange = {(event) => {
                    setSearchTerm(event.target.value);
                }}
                onClick = {() => setRequest(searchTerm)}
                labelText = {title}/>
                {user.role === 'admin' && <Button buttonText = {btnAddNew} 
                datatestid = 'add-btn'
                onClick = {onClick}
                />}
            </div>
            <div className="courses__box" id = "search" data-testid = "courses-box">
              {result}
            </div>
            </div>
      );
  }
export default Courses;

