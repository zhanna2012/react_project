import React from 'react';

import './Button.css';

function Button(props) {
    return (
        <button onClick={props.onClick} 
        data-testid = {props.datatestid}
        className = "btn" 
        onSubmit = {props.onSubmit} id={props.id}
        >
          {props.buttonText}
        </button>
      );
  }
export default Button;
  