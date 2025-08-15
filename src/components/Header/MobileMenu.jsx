import styles from "./MobileMenu.module.scss";

import navLinks from "../../data/navigation";

import SNSLinks from "../SNSLinks/SNSLinks";

const MobileMenu = ({ basename, open, onClose }) => {
    return (
        <div className={`${styles.backdrop} ${open ? styles.open : ""}`} aria-hidden={!open}>
            <aside id="mobile-menu" className={styles.panel} role="dialog" aria-modal="true" aria-label="Main menu">
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