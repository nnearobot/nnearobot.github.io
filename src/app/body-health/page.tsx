import Header from '@/components/Header'
import CalorieCalc from '@/components/CalorieCalc'
import BodyFatCalc from '@/components/BodyFatCalc'
import H1 from '@/components/UI/H1'
import H2 from '@/components/UI/H2'

export default function HealthPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between container p-10">
        <H1>Healthy Body, Healthy Mind</H1>
        <p>Here are some useful tools for calculating health parameters.</p>

        <H2>Daily Calorie Calculator</H2>
        <CalorieCalc />

        <H2>Body Fat Percentage Calculator</H2>
        <BodyFatCalc />
      </main>
    </>
  )
}
