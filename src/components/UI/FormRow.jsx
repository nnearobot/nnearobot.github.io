const FormRow = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <div className="form-row">{ children }</div>
    );
};

export default FormRow;