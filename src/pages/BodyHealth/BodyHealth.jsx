import { Container } from '@/components/UI'
import CalorieCalc from './CalorieCalc'
import BodyFatCalc from './BodyFatCalc'

const HealthPage = () => {
  return (
    <>
      <h1>Healthy Body, Healthy Mind</h1>
      <Container>
        <p className="md:text-md text-center">Here are some useful tools for calculating health parameters.</p>

        <h2>Daily Calorie Calculator</h2>
        <CalorieCalc />

        <h2>Body Fat Percentage Calculator</h2>
        <BodyFatCalc />
      </Container>
    </>
  )
}

export default HealthPage;