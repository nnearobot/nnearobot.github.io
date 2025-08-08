import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import styles from "./ThemeToggle.module.scss";

import { useTheme } from "../../theme/ThemeProvider";

const ThemeToggle = () => {
    const { theme, toggle } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            className={styles.toggle}
            onClick={toggle}
            aria-label={isDark ? "Switch to light" : "Switch to dark"}
            title={isDark ? "Switch to light" : "Switch to dark"}
        >
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} className={theme} />
        </button>
    );
};

export default ThemeToggle;