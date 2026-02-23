import styles from "./Range.module.scss";

const Range = ({
    label,
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    formatValue, // (value) => string | number | ReactNode
    className,
    ...aria
}) => {
    const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

    const displayValue = typeof formatValue === "function" ? formatValue(value) : value;

    return (
        <div className={`${styles.rng} ${className ?? ""}`}>
            <span className={styles.label}>
                {displayValue}
                {label && <span>{label}</span>}
            </span>

            <input
                type="range"
                className={styles.input}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                style={{ "--rng-fill": `${pct}%` }}
                {...aria}
            />
        </div>
    );
};

export default Range;
