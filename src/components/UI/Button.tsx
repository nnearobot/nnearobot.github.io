const Button = ({...props}) => {
    return (
        <button {...props} className='bg-zinc-400 color-white'>
            {props.children}
        </button>
    );
};

export default Button;