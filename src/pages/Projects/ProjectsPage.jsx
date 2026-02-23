import { Container } from '@/components/UI';

import styles from "./ProjectsPage.module.scss";

const ProjectsPage = () => {
  return (
    <div className={styles.projects}>
      <h1>My Projects</h1>
      <Container>
        <h4><a href="/body-health">Body Health</a></h4>
        <h4><a href="/binary-birthday">Binary Birthday</a></h4>
        <h4><a href="/conway-life">Conway's Game of Life</a></h4>
      </Container>
    </div>
  )
}

export default ProjectsPage;