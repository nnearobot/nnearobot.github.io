import { Container } from '@/components/UI';

import styles from "./ProjectsPage.module.scss";

const ProjectsPage = () => {
  return (
    <div className={styles.projects}>
      <h1>My Projects</h1>
      <Container>
        <h4><a href="/body-health">Body Health</a></h4>
        <p className={styles.description}>
          A practical page with calculators for daily calories and macronutrients, plus body fat percentage.
          It helps you estimate key health metrics in one place.
        </p>
        <h4><a href="/binary-birthday">Binary Birthday</a></h4>
        <p className={styles.description}>
          A photo timeline of my birthday cakes where binary candles represent my age.
          Each year shows a new cake and a new binary number.
        </p>
        <h4><a href="/conway-life">Conway's Game of Life</a></h4>
        <p className={styles.description}>
          An interactive Conway simulation where you can tweak settings and watch patterns evolve.
          Experiment with rules and speed to see different outcomes.
        </p>
      </Container>
    </div>
  )
}

export default ProjectsPage;
