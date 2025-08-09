import styles from "./DropCap.module.scss"

const DropCap = ({ ...props }) => {

    let {
        children,
        className,
        ...rest
    } = props

    className = className || ""

    return (
        <span className={styles.dropCap}>{children}</span>
    );
};

export default DropCap;