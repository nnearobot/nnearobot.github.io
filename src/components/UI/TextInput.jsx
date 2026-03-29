import { forwardRef } from "react";

import styles from "./TextInput.module.scss";

const TextInput = forwardRef(({ ...props }, ref) => {
    let {
        className = "",
        type = "text",
        ...rest
    } = props;

    return (
        <input ref={ref} type="text" {...rest} className={`${styles.input} ${className}`} />
    );
});

export default TextInput;
