const H4 = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props;

    className = className || "";

    return (
        <h4 className={`mb-2 mt-1 text-zinc-600 text-md capitalize ${className}`}>{ children }</h4>
    );
};

export default H4;