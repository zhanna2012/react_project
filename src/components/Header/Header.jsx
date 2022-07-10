import {React, useEffect, useState} from 'react';

import Button from "../../common/Button/Button";
import Logo from "./components/Logo";

import './Header.css';

import {buttonLogin, buttonSignUp, logout} from '../../constants'
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import {getUser} from '../../store/selectors';
import {setUserAction} from '../../store/user/actionCreators'
import {fetchUser} from '../../asyncActions/fetchActions'
import axios from 'axios';

function Header(props) {
 const dispatch = useDispatch();
 const user = useSelector(getUser);

 const navigate = useNavigate();
 const[flag, setFlag] = useState(true);
 const[flagLogOut, setFlagLogOut] = useState(false);

useEffect(() => {
  if(user.isAuth === true) {
    localStorage.setItem('token', user.token);
  }
})

 
useEffect(() => {
      if(localStorage.getItem('token') !== null
      && props.fetchStatus === 'entered') {
        dispatch(fetchUser());
        setFlag(false);
        setFlagLogOut(true);
      } else if(localStorage.getItem('token') === null 
      && props.fetchStatus === 'auth'){
        setFlag(false);
        setFlagLogOut(false);
      } else if(props.fetchStatus === 'home'
      && localStorage.getItem('token') === null) {
        setFlag(true);
        setFlagLogOut(false);
      }
 }, [props.fetchStatus, dispatch, user, navigate]);
 
  return (
      <header id = 'header'>
          <div className="header__wrapper">
           <div className="logo__wrapper">
               <Link to = {"/"}><Logo className = "logo"/></Link>
           </div>
           <div className="user__block">
               <p className="user__name" data-testid = "user-name">{user.name}</p>
               {(flag) && <> <Button buttonText = {buttonLogin}  onClick = {
                    (e) => {
                        e.preventDefault();
                        navigate("/login");
                        setFlag(false);
                        setFlagLogOut(false);
                    }
                }/>
               <Button buttonText = {buttonSignUp} onClick = {
                    (e) => {
                        e.preventDefault();
                        navigate("/register");
                        setFlag(false);
                        setFlagLogOut(false);
                    }
                }/> </>}
                {flagLogOut && <Button buttonText = {logout} onClick = {
                    async (e) => {
                        e.preventDefault();
                        navigate("/login");
                        await axios.delete('http://localhost:4000/logout', {
                          headers: {
                            'Authorization' : localStorage.getItem('token'),
                            'Content-Type': 'application/json'
                          },
                        }).then((rez) => {
                          localStorage.removeItem('token');
                          const userResponse = {
                            isAuth: false,
                            name: rez.data,
                            email: rez.data,
                            token: rez.data,
                            role: rez.data
                        };
                        dispatch(setUserAction(userResponse));
                        console.log(user);
                        setFlag(false);
                        setFlagLogOut(false);
                        })
                        .catch((err) => console.log("Logout error " + err));
                    }
                }/>}
           </div>
          </div>          
      </header>
    );
}
export default Header;
