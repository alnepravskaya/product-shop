import classes from './Input.module.css';
import React from 'react';

const Input = (props) => {
  return (
    <div className={classes.input}>
      <input {...props.input} onChange={props.onChange} />
    </div>
  );
};

export default Input;
