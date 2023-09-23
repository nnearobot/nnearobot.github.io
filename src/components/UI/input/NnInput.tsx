import React from 'react';
import classes from './NnInput.module.css';

const NnInput = ({...props}) => {
    return (
        <input {...props} className={classes.nn_input} />
    );
};

export default NnInput;