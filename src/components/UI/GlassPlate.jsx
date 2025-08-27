import styles from "./GlassPlate.module.scss";

const GlassPlate = ({ ...props }) => {
    let {
        children,
        className = "",
        ...rest
    } = props

    return (
        <div className={`${styles.glassPlate} ${className}`} {...rest}>
            {children}
        </div>
    );
};

export default GlassPlate;
