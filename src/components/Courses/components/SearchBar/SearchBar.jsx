import React from 'react';

import Button from "../../../../common/Button/Button";
import Input from "../../../../common/Input/Input";

import './SearchBar.css'

import {inputPlaceholder, btnSearch} from '../../../../constants'


function SearchBar(props) {
    return (
        <div className = "search__bar">
             <Input placeholdetText = {inputPlaceholder} onChange = {props.onChange} labelText={props.labelText}/>
             <Button buttonText = {btnSearch} onClick = {props.onClick}/>
        </div>
      );
  }
export default SearchBar;
  