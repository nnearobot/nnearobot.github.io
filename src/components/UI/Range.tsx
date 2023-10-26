import { useState } from 'react';

const Range = function({...props}) {
    let {
        className,
        ...rest
    } = props

    className = className || ""


    const [value, setValue] = useState(props.value)

    function handleSlide(event: React.FormEvent<HTMLInputElement>) {
        setValue(event.currentTarget.value);

        props.onChange(event);
    }

    return (
        <>
            <input {...props} type="range" onChange={handleSlide} className={`accent-zinc-500 ${className}`} /> <span>{value}</span>
        </>
    );    
}

export default Range;