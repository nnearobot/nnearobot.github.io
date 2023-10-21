const FormLabel = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <div className={`md:text-end col-span-1 ${className}`}>{ children }</div>
    );
};

export default FormLabel;