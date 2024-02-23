const Container = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <div className={`container max-w-4xl mx-auto p-2 xs:p-3 sm:p-6 md:p-10 ${className}`}>
            {props.children}
        </div>
    );
};

export default Container;