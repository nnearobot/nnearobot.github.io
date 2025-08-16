import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./MobileMenu.module.scss";

import navLinks from "../data/navigation";

import SNSLinks from "./SNSLinks";
import { Button } from './UI';

const MobileMenu = ({ basename, open, onClose }) => {
    return (
        <div className={`${styles.backdrop} ${open ? styles.open : ""}`} aria-hidden={!open}>
            <aside id="mobile-menu" className={styles.panel} role="dialog" aria-modal="true" aria-label="Main menu">
                <Button className={styles.close} onClick={onClose} aria-label="Close menu">
                    <FontAwesomeIcon icon={faXmark} />
                </Button>
                <nav className={styles.menu}>
                    <ul>
                        {navLinks.map((l) => (
                            <li key={l.id}>
                                <a href={`${basename}${l.url}`} onClick={onClose}>{l.title}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className={styles.snsWrap}>
                    <SNSLinks withLabels={true} />
                </div>
            </aside>
        </div>
    );
};

export default MobileMenu;