const H3 = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <h3 className={`font-bold text-xl ${className}`}>{ children }</h3>
    );
};

export default H3;