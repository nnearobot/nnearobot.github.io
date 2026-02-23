import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./SNSLinks.module.scss";

import snsLinks from "@/data/sns";

const SNSLinks = ({ withLabels = false, className }) => {
    const classes = [styles.sns, className].filter(Boolean).join(" ");

    return (
        <nav className={classes} aria-label="social links">
            <ul>
                {snsLinks.map((s) => (
                    <li key={s.id}>
                        <a href={s.url} title={s.title} aria-label={s.title} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={s.icon} />
                            {withLabels && <span className={styles.label}>{s.label}</span>}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SNSLinks;
