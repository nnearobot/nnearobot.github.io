const Container = ({...props}) => {
    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <main className={`flex min-h-screen flex-col justify-start container mx-auto p-10 ${className}`}>
            {props.children}
        </main>
    );
};

export default Container;