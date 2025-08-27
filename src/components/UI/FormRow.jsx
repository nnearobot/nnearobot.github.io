const FormRow = ({...props}) => {
    let {
        children,
        className = "",
        ...rest
    } = props

    return (
        <div className={`formRow ${className}`} {...rest}>{ children }</div>
    );
};

export default FormRow;