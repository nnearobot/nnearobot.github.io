import Header from '@/components/Header';
import Container from '@/components/UI/Container';
import DropCap from '@/components/UI/DropCap';
import H1 from '@/components/UI/H1';
import H2 from '@/components/UI/H2';
import H4 from '@/components/UI/H4';
import TagCloud from '@/components/UI/TagCloud';

import { languages, frameworks, frontend, backend, devops, software, os } from '../../data/skills';

export default function AboutPage() {
  return (
    <>
      <Header />
      <Container className="max-w-4xl mx-auto ">
        <H1 className="!mb-0">Rimma Maksiutova</H1>
        <p className="text-zinc-400 text-sm mb-10 text-center">(She/Her)</p>
        <p className="capitalize mb-5 text-center text-md">Full stack software engineer | Engineering manager</p>
        <p className="text-center text-zinc-600">Translating product goals into software solutions.</p>
        <p className="mb-10 text-center text-zinc-600">Passionate about continuous learning and professional development.</p>

        
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


        <p className="mt-20">To be continued...</p>

      </Container>
    </>
  )
}
