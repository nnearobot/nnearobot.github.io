import styles from "./TextInput.module.scss";

const TextInput = ({ ...props }) => {
    let {
        className = "",
        type = "text",
        ...rest
    } = props;

    return (
        <input type="text" {...rest} className={`${styles.input} ${className}`} />
    );
};

export default TextInput;