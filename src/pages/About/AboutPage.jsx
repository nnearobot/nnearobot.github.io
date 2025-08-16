import { Container, DropCap, TagCloud } from '@/components/UI';
import { DownloadCVBtn } from "@/components";

import { languages, frameworks, frontend, backend, devops, software, os } from '@/data/skills';

import styles from "./AboutPage.module.scss";

const AboutPage = () => {
    return (
        <div className={styles.about}>
            <h1>Rimma Maksiutova</h1>
            <Container>
                <div className={styles.info}>
                    <p className="pronounce">(She/Her)</p>
                    <p className="title">Full stack software engineer&nbsp;| Engineering manager</p>
                    <p>Translating product goals into software solutions.</p>
                    <p className={styles.cvBtn}><DownloadCVBtn /></p>
                </div>

                <h2>Experience</h2>
                <p><DropCap>12</DropCap> years of web development</p>
                <p><DropCap>3</DropCap> years of engineering management, team leadership, and CTO</p>

                <h2>Languages</h2>
                <p><b>Russian:</b> native</p>
                <p><b>English:</b> business</p>
                <p><b>Japanese:</b> JLPT N3, conversational</p>

                <h2>Tech stack</h2>

                <h4>Programming Languages:</h4>
                <TagCloud tags={languages} />

                <h4>Frameworks:</h4>
                <TagCloud tags={frameworks} />

                <h4>Frontend:</h4>
                <TagCloud tags={frontend} />

                <h4>Backend:</h4>
                <TagCloud tags={backend} />

                <h4>DevOps & tools:</h4>
                <TagCloud tags={devops} />

                <h4>Software:</h4>
                <TagCloud tags={software} />

                <h4>OS:</h4>
                <TagCloud tags={os} />

            </Container>
        </div>
    )
}

export default AboutPage;