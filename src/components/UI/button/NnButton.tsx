import React from "react";
import classes from './NnButton.module.css';

const NnButton = ({...props}) => {
    return (
        <button {...props} className={classes.nn_btn}>
            {props.children}
        </button>
    );
};

export default NnButton;