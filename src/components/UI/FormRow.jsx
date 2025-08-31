import styles from "./Form.module.scss";

const FormRow = ({
    align,
    justify,
    className,
    children,
    ...rest
}) => {
    const mergedStyle = {
        alignItems: align,
        justifyContent: justify,
    };

    return (
        <div className={`${styles.row}${className ? " " + className : ""}`} style={mergedStyle} {...rest}>
            {children}
        </div>
    );
};

export default FormRow;