import s from "./Form.module.scss";

const FormCell = ({
    col,
    mobile,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    className,
    as: Tag = "div",
    children,
    ...rest
}) => {
    const mergedStyle = {
        ["--fc-col"]: col,
        ["--fc-col-mobile"]: mobile,
        ["--fc-col-xs"]: xs,
        ["--fc-col-sm"]: sm,
        ["--fc-col-md"]: md,
        ["--fc-col-lg"]: lg,
        ["--fc-col-xl"]: xl,
        ["--fc-col-xxl"]: xxl,
    };

    return (
        <Tag className={`${s.cell}${className ? " " + className : ""}`} style={mergedStyle} {...rest}>
            {children}
        </Tag>
    );
};

export default FormCell;