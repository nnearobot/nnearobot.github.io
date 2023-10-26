const Container = ({...props}) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start container mx-auto p-10">
            {props.children}
        </main>
    );
};

export default Container;