import React from 'react';

import './styles/main.css';

import Header from './components/Header';
import Footer from './components/Footer';
import CalorieCalc from './components/CalorieCalc';

function App() {
  return (
    <div className="App">
      <Header />
      <CalorieCalc />
      <Footer />
    </div>
  );
}


export default App;
