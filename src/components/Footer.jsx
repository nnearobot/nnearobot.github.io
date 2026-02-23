import SNSLinks from "./SNSLinks";
import { Container } from './UI';

import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container className={styles.container}>
                <div className={styles.left}>
                    <SNSLinks withLabels className={styles.snsVertical} />
                </div>
                <div className={styles.copy}>© 2023—2025 Rimma&nbsp;Maksiutova</div>
            </Container>
        </footer>
    );
};

export default Footer;
