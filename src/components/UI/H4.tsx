const H4 = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props;

    className = className || "";

    return (
        <h4 className={`mb-1 mt-2 text-zinc-600 text-lg md:text-xl capitalize ${className}`}>{ children }</h4>
    );
};

export default H4;