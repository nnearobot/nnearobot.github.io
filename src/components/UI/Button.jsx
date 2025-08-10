import styles from "./Button.module.scss"

const Button = ({ ...props }) => {

    let {
        children,
        className,
        ...rest
    } = props;

    className = className || "";

    return (
        <button {...rest} className={`${styles.button} ${className}`}>
            {props.children}
        </button>
    );
};

export default Button;