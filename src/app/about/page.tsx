import Container from '@/components/UI/Container';
import DropCap from '@/components/UI/DropCap';
import H1 from '@/components/UI/H1';
import H2 from '@/components/UI/H2';
import H4 from '@/components/UI/H4';
import TagCloud from '@/components/UI/TagCloud';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import { urls } from '@/data/urls';

import { languages, frameworks, frontend, backend, devops, software, os } from '@/data/skills';

export default function AboutPage() {
  return (
    <>
      <H1 className="!mb-0">Rimma Maksiutova</H1>
      <Container>
        <p className="text-zinc-500 text-sm mb-10 text-center">(She/Her)</p>
        <p className="capitalize mb-5 text-center text-md md:text-xl">Full stack software engineer&nbsp;| Engineering manager</p>
        <p className="text-center text-zinc-500">Translating product goals into software solutions.</p>
        <p className="mb-10 text-center text-zinc-500">Passionate about continuous learning and professional development.</p>

        <p className="text-center mt-8">
          <a href={urls.cv.url}
            title={urls.cv.title}
            className="border border-zinc-700 hover:border-zinc-900 dark:border-zinc-400 dark:hover:border-zinc-100 rounded-xl px-4 pt-2 pb-1 text-md text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
            <FontAwesomeIcon icon={faCloudArrowDown} className="md:text-xl" /> Download CV
          </a>
        </p>

        <H2>Experience</H2>
        <p><DropCap>12</DropCap> years of web development</p>
        <p><DropCap>3</DropCap> years of engineering management, team leadership, and CTO</p>

        <H2>Languages</H2>
        <p><b>Russian:</b> native</p>
        <p><b>English:</b> business</p>
        <p><b>Japanese:</b> JLPT N3, conversational</p>

        <H2>Tech stack</H2>

        <H4>Programming Languages:</H4>
        <TagCloud tags={languages} className="mb-5" />

        <H4>Frameworks:</H4>
        <TagCloud tags={frameworks} className="mb-5" />

        <H4>Frontend:</H4>
        <TagCloud tags={frontend} className="mb-5" />

        <H4>Backend:</H4>
        <TagCloud tags={backend} className="mb-5" />

        <H4>DevOps & tools:</H4>
        <TagCloud tags={devops} className="mb-5" />

        <H4>Software:</H4>
        <TagCloud tags={software} className="mb-5" />

        <H4>OS:</H4>
        <TagCloud tags={os} className="mb-5" />


        <H2>Projects</H2>
        <p>[Under construction]</p>

      </Container>
    </>
  )
}
