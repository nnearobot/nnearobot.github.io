const H1 = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <h1 className={`mb-4 font-bold text-4xl ${className}`}>{ children }</h1>
    );
};

export default H1;