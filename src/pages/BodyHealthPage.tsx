import React from 'react';

import CalorieCalc from '../components/CalorieCalc';

function BodyHealthPage() {
  return (
    <div className="container body-health">
      <h1>Healthy Body, Healthy Mind</h1>
      <p>Here are some useful tools for calculating health parameters.</p>
      <h2>Daily Calorie Calculator</h2>
      <CalorieCalc />

      <h2>Body Fat Percentage Calculator</h2>
      <p>Coming soon...</p>
    </div>
  );
}


export default BodyHealthPage;