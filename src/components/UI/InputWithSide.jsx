import { forwardRef } from "react";

import TextInput from "./TextInput";

import styles from "./InputWithSide.module.scss";

const InputWithSide = forwardRef(({ side = "right", sideLabel, className = "", ...rest }, ref) => {
    const inputStyle =
        side === "left" ? styles.right : styles.left;

    return (
        <div className={`${styles.wrapper} ${className}`}>
            {side === "left" && (
                <div className={`${styles.side} ${styles.left}`}>{sideLabel}</div>
            )}

            <TextInput
                type="text"
                {...rest}
                ref={ref}
                className={`${styles.input} ${inputStyle}`}
            />

            {side === "right" && (
                <span className={`${styles.side} ${styles.right}`}>{sideLabel}</span>
            )}
        </div>
    );
});

export default InputWithSide;
