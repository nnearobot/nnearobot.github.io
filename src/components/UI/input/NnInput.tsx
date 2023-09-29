import React from 'react';
import classes from './NnInput.module.scss';

const NnInput = ({...props}) => {
    return (
        <input {...props} className={`form-control ${classes.nn_input}`} />
    );
};

export default NnInput;