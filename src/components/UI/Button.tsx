const Button = ({...props}) => {
    return (
        <button {...props} className='bg-nn-400 color-white'>
            {props.children}
        </button>
    );
};

export default Button;