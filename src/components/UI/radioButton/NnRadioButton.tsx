import React from 'react';
import classes from './NnRadioButton.module.scss';

const NnRadioButton = ({...props}) => {
    return (
        <input type="radio" {...props} className={classes.nn_radio} />
    );
};

export default NnRadioButton;