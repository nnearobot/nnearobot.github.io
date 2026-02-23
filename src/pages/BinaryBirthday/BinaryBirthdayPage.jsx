import { useMemo, useState } from "react";

import { Container } from "@/components/UI";

import styles from "./BinaryBirthdayPage.module.scss";

const FIRST_YEAR = 2014;
const LAST_YEAR = 2025;
const BIRTH_YEAR = 1986;
const BIRTHDAY = "April 13th";

const getYears = () => {
    const years = [];

    for (let year = LAST_YEAR; year >= FIRST_YEAR; year -= 1) {
        years.push(year);
    }

    return years;
};

const BinaryBirthdayImage = ({ year }) => {
    const [src, setSrc] = useState(`/binary-birthday/${year}.jpg`);
    const [triedFallback, setTriedFallback] = useState(false);

    const onError = () => {
        if (!triedFallback) {
            setTriedFallback(true);
            setSrc(`/binary-birthday/${year}.JPG`);
        }
    };

    return (
        <img
            src={src}
            alt={`Birthday cake for ${BIRTHDAY} ${year}`}
            loading="lazy"
            onError={onError}
        />
    );
};

const BinaryBirthdayPage = () => {
    const years = useMemo(() => getYears(), []);

    return (
        <section className={styles.binaryBirthday}>
            <Container>
                <h1>Binary Birthday Timeline</h1>
                <p className={styles.lead}>Each year is marked by a photo of a cake where candles encode my age in binary.</p>

                <ol className={styles.timeline} aria-label="Binary Birthday Timeline">
                    {years.map((year) => {
                        const age = year - BIRTH_YEAR;
                        const binaryAge = age.toString(2);

                        return (
                            <li className={styles.entry} key={year}>
                                <div className={styles.yearColumn}>
                                    <p className={styles.year}>{year}</p>
                                    <p className={styles.meta}>Age: {age}</p>
                                    <p className={styles.binary}>{binaryAge}</p>
                                </div>

                                <figure className={styles.photo}>
                                    <BinaryBirthdayImage year={year} />
                                </figure>
                            </li>
                        );
                    })}
                </ol>
            </Container>
        </section>
    );
};

export default BinaryBirthdayPage;
