import styles from "./Footer.module.scss";

import navLinks from "../../data/navigation";

import SNSLinks from "../SNSLinks/SNSLinks";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.flex}>
                    <div>
                        <SNSLinks withLabels={true} />
                    </div>
                    <div className={styles.copy}>© 2023—2025 Rimma Maksiutova</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;