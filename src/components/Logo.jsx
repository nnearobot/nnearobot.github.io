import styles from "./Logo.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";


const Logo = () => {
    return (
        <div className={styles.logo} aria-label="nnearobot logo">
            <FontAwesomeIcon icon={faAt} className={styles.icon} aria-hidden="true" />
            <span className={styles.wordmark}>nnearobot</span>
        </div>
    );
};

export default Logo;