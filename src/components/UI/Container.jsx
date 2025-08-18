const Container = ({ ...props }) => {
    let {
        children,
        className = "",
        ...rest
    } = props;

    return (
        <div {...rest} className={`container ${className}`}>
            {children}
        </div>
    );
};

export default Container;