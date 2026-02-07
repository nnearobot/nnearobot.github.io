import { useMemo, useEffect, useRef } from "react";

import { Container, GlassPlate } from "@/components/UI";

import styles from "./BinaryBirthdayPage.module.scss";

const FIRST_YEAR = 2014;
const LAST_YEAR = 2025;
const BIRTH_YEAR = 1986;
const BIRTHDAY_MONTH = 4;
const BIRTHDAY_DAY = 13;

// Convert number to a binary array with optional left padding.
function toBinaryBits(n, minLength = 0) {
    const binary = n.toString(2).padStart(minLength, "0");
    return binary.split("").map((ch) => Number(ch));
}

// IntersectionObserver-based reveal-on-scroll.
function useRevealOnScroll() {
    const containerRef = useRef(null);

    useEffect(() => {
        const root = containerRef.current;
        if (!root) return;

        const els = root.querySelectorAll("[data-reveal]");
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return containerRef;
}

// Small random helper for flame variety.
function randRange(min, max) {
    return Math.random() * (max - min) + min;
}

const BinaryBirthdayPage = () => {
    const ref = useRevealOnScroll();

    const maxBits = useMemo(() => toBinaryBits(LAST_YEAR - BIRTH_YEAR).length, []);

    const cakes = useMemo(() => {
        const items = [];

        for (let year = LAST_YEAR; year >= FIRST_YEAR; year -= 1) {
            const age = year - BIRTH_YEAR;
            const date = new Date(year, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY);
            const bits = toBinaryBits(age, maxBits);

            items.push({
                year,
                age,
                date,
                bits,
                src: `/birthdays/${year}.jpg`,
                isLatest: year === LAST_YEAR,
            });
        }

        return items;
    }, [maxBits]);

    return (
        <section className={styles.binaryCakes} ref={ref}>
            <Container>
                <header className={styles.hero}>
                    <p className={styles.eyebrow}>Binary Birthday Timeline</p>
                    <h1>My Binary Birthday Gallery</h1>
                    <p className={styles.lead}>
                        Each year is marked by a photo of a cake where every candle is a bit: a lit candle is a 1, an
                        unlit candle is a 0. Together they encode my age in binary.
                    </p>
                </header>

                <div className={styles.timeline} aria-label="Binary birthday timeline">
                    <div className={styles.line} aria-hidden="true" />
                    <ol className={styles.entries}>
                        {cakes.map((cake) => {
                            const dateLabel = cake.date.toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            });

                            return (
                                <li
                                    key={cake.year}
                                    className={styles.entry}
                                    data-reveal
                                    data-latest={cake.isLatest ? "true" : undefined}
                                >
                                    <div className={styles.marker} aria-hidden="true" />
                                    <article className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.dateBlock}>
                                                <span className={styles.date}>{dateLabel}</span>
                                                <span className={styles.year}>{cake.year}</span>
                                            </div>
                                            <div className={styles.ageBlock}>
                                                <span className={styles.ageLabel}>Age</span>
                                                <span className={styles.ageValue}>{cake.age}</span>
                                            </div>
                                        </div>

                                            <img
                                                src={cake.src}
                                                alt={`Cake from ${cake.year} with binary candles for age ${cake.age}`}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                    </article>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </Container>
        </section>
    );
};

export default BinaryBirthdayPage;
