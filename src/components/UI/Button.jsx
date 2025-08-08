import './Button.module.scss';

const Button = ({ ...props }) => {

    let {
        children,
        className,
        ...rest
    } = props;

    className = className || "";

    return (
        <button {...props} className={`btn ${className}`}>
            {props.children}
        </button>
    );
};

export default Button;