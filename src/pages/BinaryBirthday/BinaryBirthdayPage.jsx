import React, { useMemo, useEffect, useRef } from "react";
import styles from "./BinaryCakeTimeline.module.scss";

/**
 * props.items: [{ date:"YYYY-MM-DD", age:Number, src:"/path.jpg", alt?:string }]
 * props.title?: string
 */

// Convert number to binary digits array (e.g., 30 -> [1,1,1,1,0])
function toBinaryBits(n) {
    const b = n.toString(2);
    return b.split("").map((ch) => Number(ch));
}

// IntersectionObserver-based reveal-on-scroll
function useRevealOnScroll() {
    const containerRef = useRef(null);
    useEffect(() => {
        const root = containerRef.current;
        if (!root) return;

        const els = root.querySelectorAll("[data-reveal]");
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add(styles.isVisible);
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
    return containerRef;
}

// Small random helper for flame variety
function randRange(min, max) {
    return Math.random() * (max - min) + min;
}

export default function BinaryCakeTimeline({ items = [], title = "Binary Birthday Cakes" }) {
    const ref = useRevealOnScroll();

    // Sort newest first by date
    const sorted = useMemo(() => {
        return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [items]);

    return (
        <section className={styles.binaryCakes} ref={ref}>
            <header className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.sub}>
                    Every year — a cake with “bit candles”. Only “1” candles are lit. Newest first.
                </p>
            </header>

            <div className={styles.timeline}>
                {/* Vertical axis line */}
                <div className={styles.line} aria-hidden="true" />
                <ol className={styles.list}>
                    {sorted.map((it, idx) => {
                        const bits = toBinaryBits(it.age);
                        const year = new Date(it.date).getFullYear();
                        const dateLabel = new Date(it.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        });

                        return (
                            <li className={styles.item} key={`${it.date}-${it.age}-${idx}`} data-reveal>
                                <article
                                    className={styles.card}
                                    role="article"
                                    aria-label={`Age ${it.age}, ${dateLabel}`}
                                >
                                    <div className={styles.meta}>
                                        <div className={styles.age}>
                                            <span className={styles.ageNumber}>{it.age}</span>
                                            <span className={styles.ageLabel}>лет</span>
                                        </div>

                                        <div
                                            className={styles.bits}
                                            title={`binary: ${bits.join("")}`}
                                            aria-label={`Binary ${bits.join("")}`}
                                        >
                                            {bits.map((bit, i) => {
                                                // Individual flicker timing and strength per flame
                                                const style = {
                                                    "--flicker-dur": `${randRange(1.6, 2.6).toFixed(2)}s`,
                                                    "--flicker-delay": `${randRange(-0.8, 0.8).toFixed(2)}s`,
                                                    "--flicker-intensity": `${randRange(0.7, 1.0).toFixed(2)}`,
                                                };
                                                return (
                                                    <span
                                                        key={i}
                                                        className={`${styles.bit} ${bit ? styles.on : styles.off}`}
                                                    >
                                                        <span className={styles.candle}>
                                                            {/* Flame is visible only for bit 1 */}
                                                            <span
                                                                className={styles.flame}
                                                                style={style}
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                        <span className={styles.bitVal}>{bit}</span>
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <figure className={styles.figure}>
                                        <img
                                            src={it.src}
                                            alt={it.alt || `Cake ${year} with binary candles for age ${it.age}`}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <figcaption className={styles.caption}>
                                            <time dateTime={it.date}>{dateLabel}</time>
                                            <span className={styles.captionSep}>•</span>
                                            <span className={styles.captionBin}>{bits.join("")}₂</span>
                                        </figcaption>
                                    </figure>
                                </article>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}