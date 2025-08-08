import './DropCap.module.scss';

const DropCap = ({ ...props }) => {

    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <span className="drop-cap">{children}</span>
    );
};

export default DropCap;