import React, { useState, useEffect } from 'react';
import NnInput from './UI/input/NnInput';
import NnRange from './UI/range/NnRange';

type stateType = {
    weight: number;
    calorie: number;
    proteinKoeff: number;
    fatKoeff: number;
    protein: number;
    fat: number;
    carb: number;
}

const CalorieCalc = function () {
    const proteinKoeffRange = [1.0, 3.0]; // g/kg
    const fatKoeffRange = [0.5, 3.0]; // g/kg
    
    const proteinCalorie = 4; // ccal/g
    const fatCalorie = 9; // ccal/g
    const carbsCalorie = 4; // ccal/g
    
    const initialState = calc({
        weight: 60,
        calorie: 1600,
        proteinKoeff: 1.6,
        fatKoeff: 1.1,
        protein: 0,
        fat: 0,
        carb: 0
    });

    const [state, setState] = useState(initialState);
    
    useEffect(() => {
        calc(initialState);
    }, []);
      
    const handleOnchange = (name: string, value: string) => {
        let newState = calc({ ...state, [name]: value });

        setState(newState);
    }

    function calc(state: stateType): stateType {
        let protein = state.weight * state.proteinKoeff; // g
        let fat = state.weight * state.fatKoeff; // g
        let carb = (state.calorie - protein * proteinCalorie - fat * fatCalorie) / carbsCalorie;

        state = {
            ...state,
            protein: Math.round(protein * 100) / 100,
            fat: Math.round(fat * 100) / 100,
            carb: Math.round(carb * 100) / 100
        }

        return state;
    }
    
    return (
        <div className="container">
            <h2>Calorie calculator</h2>
            <form>
                <div className='row mb-1'>
                    <label className='col-md-3 col-lg-2'>Your weight</label>
                    <div className='col-md-9 col-lg-10'>
                        <NnInput
                            value={state.weight}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('weight', event.currentTarget.value)}
                            type="text"
                            placeholder="Weight"
                        />                        
                    </div>
                </div>
                <div className='row mb-4'>
                    <label className='col-md-3 col-lg-2'>Desired day calories</label>
                    <div className='col-md-9 col-lg-10'>
                        <NnInput
                            value={state.calorie}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('calorie', event.currentTarget.value)}
                            type="text"
                            placeholder="Calories"
                        />                        
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-md-3 col-lg-2'>Proteins:</label>
                    <div className='col-md-9 col-lg-2 fs-5'><b>{state.protein}</b></div>
                    <div className='col-md-9 col-lg-4 fs-5'>
                        <NnRange
                            min={proteinKoeffRange[0]}
                            max={proteinKoeffRange[1]}
                            step={0.1}
                            value={state.proteinKoeff}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('proteinKoeff', event.currentTarget.value)}
                        /> g/kg
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-md-3 col-lg-2'>Fats:</label>
                    <div className='col-md-9 col-lg-2 fs-5'><b>{state.fat}</b></div>
                    <div className='col-md-9 col-lg-4 fs-5'>
                        <NnRange
                            min={fatKoeffRange[0]}
                            max={fatKoeffRange[1]}
                            step={0.1}
                            value={state.fatKoeff}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('fatKoeff', event.currentTarget.value)}
                        /> g/kg
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-md-3 col-lg-2'>Carbs:</label>
                    <div className='col-md-9 col-lg-10 fs-5'><b>
                        {state.carb}
                    </b></div>
                </div>
            </form>
        </div>
    );
};

export default CalorieCalc;