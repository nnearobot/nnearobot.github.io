const Container = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <div className={`container max-w-4xl mx-auto px-2 xs:px-3 sm:px-6 md:px-10 ${className}`}>
            {props.children}
        </div>
    );
};

export default Container;