import {React, useState, useEffect} from 'react';

import './Login.css';

import {register, registerLabel, login} from '../../constants'

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { Link, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getUser} from '../../store/selectors';
import {setUserAction} from '../../store/user/actionCreators'
import axios from 'axios';


function Login() {
    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [dirtyEmail, setdirtyEmail] = useState(false);
    const [dirtyPassword, setdirtyPassword] = useState(false);

    const [dirtyEmailError, setdirtyEmailError] = useState('Input can not be empty');
    const [dirtyPasswordError, setdirtyPasswordError] = useState('Input can not be empty');

    useEffect(() => {
        localStorage.removeItem('token');
    });
    const navigate = useNavigate();

    const blurHandler = (e) => {
        switch (e.target.name) {
        case 'email':
            setdirtyEmail(true);
            break;
        case 'password':
            setdirtyPassword(true);
            break;
        default:
            break;
        }
    }
    const validation = (e) => {
        switch (e.target.name) {
            case 'email':
                if(!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))){
                    setdirtyEmailError('Invalid email');
                    setdirtyEmail(true);
                } else {
                    setdirtyEmailError('');
                    setdirtyEmail(false);
                }
                break;
            case 'password':
                if(password.length <= 4 || !(/(?=.*[0-9])(?=.*[a-z]){6,}/g.test(password))) {
                    setdirtyPasswordError('Invalid password');
                    setdirtyPassword(true);
                } else {
                    setdirtyPasswordError('');
                    setdirtyPassword(false);
                }
                break;
            default:
                break;
    }
}
    async function handleSubmit(e) {
        e.preventDefault();
        if(dirtyEmailError !== ''){
            alert('Enter correct email')
        } else if(dirtyPasswordError !== ''){
            alert('Enter correct password')
        } else {
            console.log(user);
            const loginUser = {
                email: email,
                password: password
            };
            await axios.post('http://localhost:4000/login', JSON.stringify(loginUser),{
                headers: {
                'Content-Type': 'application/json',
                },
               }).then((result) => {
                console.log('login result')
                console.log(result.data.result);
                localStorage.setItem('token', result.data.result);
                const userResponse = {
                    isAuth: result.data.successful,
                    name: result.data.user.name,
                    email: result.data.user.email,
                    token: result.data.result
                };
                console.log('login token');
                console.log(localStorage.getItem('token'));
                dispatch(setUserAction(userResponse));
                navigate('/courses');  
              })
              .catch((err) => console.log('Error of authonification' + err));;
        }
    }
  return (
      <form className='login' onSubmit={handleSubmit}>
          <div className='login__wrapper'>
              <h2 className='login__title'>Login</h2>
                {(dirtyEmail && dirtyEmailError) &&     
               <div className="error">{dirtyEmailError}</div>}
                <Input placeholdetText = {register.email} 
                    onChange = {(e) => {
                        setEmail(e.target.value);
                        validation(e);
                    }} 
                    labelText={registerLabel.email}
                    name = 'email'
                    value={email}
                    type = 'email'
                    onBlur = {e => blurHandler(e)}/>
                {(dirtyPassword && dirtyPasswordError) &&     
               <div className="error">{dirtyPasswordError}</div>}
                <Input placeholdetText = {register.password} 
                    onChange = {(e) => {
                        setPassword(e.target.value);
                        validation(e);
                    }} 
                    labelText={registerLabel.password}
                    name = 'password'
                    value={password}
                    type = 'password'
                    onBlur = {e => blurHandler(e)}/>
                <Button buttonText = {login} 
                    type = "submit"/>
                <div>
                    If you don't have an account, you can <Link to={"/register"}>Register</Link>
                </div>
          </div>
      </form>
    );
}
export default Login;
