const H2 = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <h2 className={`mt-10 mb-3 text-nn-600 font-bold text-2xl ${className}`}>{ children }</h2>
    );
};

export default H2;