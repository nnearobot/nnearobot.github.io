import { useEffect, useState } from "react";

import styles from "./Header.module.scss";

import navLinks from "../../data/navigation";

import Logo from "../Logo/Logo";
import SNSLinks from "../SNSLinks/SNSLinks";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [isNarrow, setIsNarrow] = useState(false);

    useEffect(() => {
        const handler = () => setIsNarrow(window.innerWidth < 768);
        handler();
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    // lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [open]);

    // Close menu on Esc key press
    useEffect(() => {
        const onEsc = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, []);

    // Focus trap when menu is open
    useEffect(() => {
        if (!open || !menuRef.current) return;
        const focusable = menuRef.current.querySelectorAll(
            'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];
        const trap = (e) => {
            if (e.key !== "Tab") return;
            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        };

        window.addEventListener("keydown", trap);
        return () => window.removeEventListener("keydown", trap);
    }, [open]);

    const toggleMenu = () => setOpen((prev) => !prev);

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.navbar}>
                    <a href="/" className={styles.brand} aria-label="Home">
                        <Logo />
                    </a>

                    {!isNarrow && (
                        <nav className={styles.nav} aria-label="main menu">
                            <ul>
                                {navLinks.map((l) => (
                                    <li key={l.id}><a href={l.url}>{l.title}</a></li>
                                ))}
                            </ul>
                        </nav>
                    )}

                    <div className={styles.actions}>
                        <ThemeToggle />
                        {!isNarrow && (
                            <div className={styles.sns}>
                                <SNSLinks />
                            </div>
                        )}
                        {isNarrow && (
                            <button
                                type="button"
                                className={`${styles.menuBtn} ${open ? styles.open : ""}`}
                                onClick={toggleMenu}
                                aria-label={open ? "Close menu" : "Open menu"}
                                aria-expanded={open}
                                aria-controls="mobile-menu"
                                title={open ? "Close" : "Menu"}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <MobileMenu open={open} onClose={() => setOpen(false)} />
        </header>
    );
};

export default Header;
