const Container = ({ ...props }) => {
    let {
        children,
        className,
        ...rest
    } = props;

    className = className || "";

    return (
        <div {...props} className={`container ${className}`}>
            {children}
        </div>
    );
};

export default Container;