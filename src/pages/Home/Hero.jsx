import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'

import { SNSLinks } from '../../components';

import { urls } from '../../data/urls';

import styles from './Home.module.scss';

const Home = () => {
    return (
        <section id="hero" className={styles.hero}>
            <div className="relative px-4 md:px-8 pt-20 md:pt-32 pb-32 md:pb-40">
                <div className="text-center">
                    <h1 className="title">Rimma Maksiutova</h1>
                    <p className="subtitle">Fullstack software engineer</p>
                    <p className="about-link"><a href="/about">About me</a></p>
                    <p className="cv-link">
                        <a href={urls.cv.url} title={urls.cv.title}>
                            <FontAwesomeIcon icon={faCloudArrowDown} className="md:text-xl" /> Download CV
                        </a>
                    </p>
                    <SNSLinks expanded="1" />
                </div>
            </div>
        </section>
    );
}


export default Home;
