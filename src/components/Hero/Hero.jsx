import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./Hero.module.scss";

import urls from '../../data/urls';

import SNSLinks from "../SNSLinks/SNSLinks";

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className="container">
                <h1 className={styles.name}>Rimma Maksiutova</h1>
                <p className={styles.subtitle}>Full‑stack software engineer</p>
                <p><a href="/about">About me</a></p>
                <p><a className={styles.cvBtn} href={urls.cv.url} title={urls.cv.title} download>
                    <FontAwesomeIcon icon={faCloudArrowDown} />
                    <span>Download CV</span>
                </a></p>
                <div className={styles.snsRow}>
                    <SNSLinks withLabels={true} />
                </div>
            </div>
        </section>
    );
};

export default Hero;