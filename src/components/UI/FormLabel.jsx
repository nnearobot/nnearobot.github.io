const FormLabel = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <div className="form-label">{ children }</div>
    );
};

export default FormLabel;