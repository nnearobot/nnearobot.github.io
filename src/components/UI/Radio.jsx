import styles from "./Radio.module.scss";

/**
type RadioOption = {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
}

type RadioGroupProps = {
  name: string;
  value: string | number;
  options: RadioOption[];
  onChange: (value: string) => void;
  className?: string; // Pass true to render compact radios without extra spacing (optional)
  "aria-label"?: string; // aria-label for group when no visible legend is present
}
*/

const RadioGroup = ({ name, value, options, onChange, className, ...aria }) => {
  return (
    <div role="radiogroup" className={className} {...aria}>
      {options.map((opt) => {
        const id = `${name}-${String(opt.value)}`;
        const checked = String(value) === String(opt.value);

        return (
          <label
            key={id}
            htmlFor={id}
            className={styles.rb}
            aria-disabled={opt.disabled ? "true" : undefined}
          >
            <input
              id={id}
              className={styles.input}
              type="radio"
              name={name}
              value={String(opt.value)}
              checked={checked}
              disabled={opt.disabled}
              onChange={onChange}
            />
            <span className={styles.control} aria-hidden />
            <span className={styles.label}>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;