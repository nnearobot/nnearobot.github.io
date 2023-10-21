const FormRow = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <div className={`grid grid-cols-1 gap-1 mb-4 md:gap-4 ${className}`}>{ children }</div>
    );
};

export default FormRow;