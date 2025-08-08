import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'

import { Container, DropCap, TagCloud } from '../../components/UI';

import urls from '../../data/urls';
import { languages, frameworks, frontend, backend, devops, software, os } from '../../data/skills';

import './About.module.scss';

const AboutPage = () => {
    return (
        <>
            <h1>Rimma Maksiutova</h1>
            <Container>
                <p className="pronounce">(She/Her)</p>
                <p className="title">Full stack software engineer&nbsp;| Engineering manager</p>
                <p>Translating product goals into software solutions.</p>
                <p>Passionate about continuous learning and professional development.</p>

                <p className="text-center cv-link">
                    <a href={urls.cv.url} title={urls.cv.title}>
                        <FontAwesomeIcon icon={faCloudArrowDown} className="md:text-xl" /> Download CV
                    </a>
                </p>

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


                <h2>Projects</h2>
                <p>[Under construction]</p>

            </Container>
        </>
    )
}

export default AboutPage;