import { Container } from '@/components/UI';
import { SNSLinks, DownloadCVBtn } from "@/components";

import styles from "./Hero.module.scss";

const Hero = () => {
    return (
        <section className={styles.hero}>
            <h1 className={styles.name}>Rimma Maksiutova</h1>
            <Container>
                <p className={styles.title}>Full‑stack software engineer</p>
                <p className={styles.aboutLink}><a href="/about">About me</a></p>
                <p><DownloadCVBtn /></p>
                <div className={styles.snsRow}>
                    <SNSLinks withLabels={true} />
                </div>
            </Container>
        </section>
    );
};

export default Hero;