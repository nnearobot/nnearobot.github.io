import TextInput from "./TextInput";
import styles from "./InputWithSide.module.scss";

const InputWithSide = ({ side = "right", sideLabel, className = "", ...rest }) => {
    const inputRounded =
        side === "left" ? styles.inputRoundedRight : styles.inputRoundedLeft;

    return (
        <div className={`${styles.wrapper} ${className}`}>
            {side === "left" && (
                <div className={`${styles.side} ${styles.sideLeft}`}>{sideLabel}</div>
            )}

            <TextInput
                type="text"
                {...rest}
                className={`${styles.input} ${inputRounded}`}
            />

            {side === "right" && (
                <div className={`${styles.side} ${styles.sideRight}`}>{sideLabel}</div>
            )}
        </div>
    );
};

export default InputWithSide;