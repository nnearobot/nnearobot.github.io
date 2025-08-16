import SNSLinks from "./SNSLinks";
import { Container } from './UI';

import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.flex}>
                    <div>
                        <SNSLinks withLabels={true} />
                    </div>
                    <div className={styles.copy}>© 2023—2025 Rimma Maksiutova</div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;