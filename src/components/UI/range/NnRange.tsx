import React, { useState } from 'react';
import classes from './NnRange.module.scss';

const NnRange = function({...props}) {
    const [value, setValue] = useState(props.value)

    function handleSlide(event: React.FormEvent<HTMLInputElement>) {
        setValue(event.currentTarget.value);

        props.onChange(event);
    }

    return (
        <>
            <input {...props} type="range" className={classes.nn_range} onChange={handleSlide} /> <span>{value}</span>
        </>
    );    
}

export default NnRange;