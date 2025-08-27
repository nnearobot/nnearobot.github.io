import { Container, GlassPlate } from '@/components/UI'
import CalorieCalc from './CalorieCalc'
import BodyFatCalc from './BodyFatCalc'

import styles from "./BodyHealthPage.module.scss";

const BodyHealthPage = () => {
  return (
    <div className={styles.bodyHealth}>
      <h1>Body Health</h1>
      <Container>
        <h2>Daily Calorie Calculator</h2>
        <GlassPlate className={styles.glassPlate}>
          <CalorieCalc />
        </GlassPlate>

        <h2>Body Fat Percentage Calculator</h2>
        <GlassPlate className={styles.glassPlate}>
          <BodyFatCalc />
        </GlassPlate>
      </Container>
    </div>
  )
}

export default BodyHealthPage;