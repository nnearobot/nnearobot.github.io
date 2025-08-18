import { useState } from 'react';

const Range = function({...props}) {
    let {
        className,
        ...rest
    } = props

    className = className || ""


    const [value, setValue] = useState(props.value)

    function handleSlide(event) {
        setValue(event.currentTarget.value);
        props.onChange(event);
    }

    return (
        <>
            <input {...rest} type="range" onChange={handleSlide} className="input-range" /> <span>{value}</span>
        </>
    );
}

export default Range;