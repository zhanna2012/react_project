import {React, useState, useEffect} from 'react';

import './Registration.css';

import {register, registerLabel, registration} from '../../constants'
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link, useNavigate  } from 'react-router-dom';


function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [dirtyName, setdirtyName] = useState(false);
    const [dirtyEmail, setdirtyEmail] = useState(false);
    const [dirtyPassword, setdirtyPassword] = useState(false);

    const [dirtyNameError, setdirtyNameError] = useState('Input can not be empty');
    const [dirtyEmailError, setdirtyEmailError] = useState('Input can not be empty');
    const [dirtyPasswordError, setdirtyPasswordError] = useState('Input can not be empty');

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
    });

    const blurHandler = (e) => {
        switch (e.target.name) {
        case 'name':
            setdirtyName(true);
            break;
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
            case 'name':
                if(name.length < 3) {
                    setdirtyNameError('Name should be more then 2 characters');
                    setdirtyName(true);
                } else {
                    setdirtyNameError('');
                    setdirtyName(false);
                }
                break;
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
        if(dirtyNameError !== '') {
            alert('Enter correct name')
        } else if(dirtyEmailError !== ''){
            alert('Enter correct email')
        } else if(dirtyPasswordError !== ''){
            alert('Enter correct password')
        } else {
            const newUser = {
                name: name,
                email: email,
                password: password
            };
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                'Content-Type': 'application/json',
                },
               });
            const result = await response.json();
            if(result.successful === true) {
                navigate("/login");
            } else {
                alert('Error of registration');
            }
        }
    }
  return (
      <form className='registration' onSubmit={handleSubmit}>
          <div className='registration__wrapper'>
              <h2 className='registration__title'>Registration</h2>
              {(dirtyName && dirtyNameError) &&     
               <div className="error">{dirtyNameError}</div>}
              <Input placeholdetText = {register.name} 
                    onChange = {(e) => {
                        setName(e.target.value);
                        validation(e);
                    }} 
                    labelText={registerLabel.name}
                    name = 'name'
                    value={name}
                    type = 'text'
                    onBlur = {e => blurHandler(e)}/>
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
                <Button buttonText = {registration} 
                    type = "submit"/>
                <div>
                    If you have an account, you can <Link to={"/login"}>Login</Link>
                </div>
          </div>
      </form>
    );
}
export default Registration;
