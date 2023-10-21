'use client'

import { useState, useEffect } from 'react';
import InputWithSide from './UI/InputWithSide';
import Range from './UI/Range';
import FormRow from './UI/FormRow';
import FormLabel from './UI/FormLabel';
import GlassPlate from './UI/GlassPlate';

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
        fatKoeff: 1.0,
        protein: 0,
        fat: 0,
        carb: 0
    });

    const [state, setState] = useState(initialState);
    
    useEffect(() => {
        calc(initialState);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
      
    const handleOnchange = (name: string, value: string) => {
        let newState = calc({ ...state, [name]: value });

        setState(newState);
    }

    function calc(state: stateType): stateType {
        let protein = Math.round(state.weight * state.proteinKoeff); // g
        let fat = Math.round(state.weight * state.fatKoeff); // g
        let carb = Math.round((state.calorie - protein * proteinCalorie - fat * fatCalorie) / carbsCalorie);

        state = {
            ...state,
            protein: protein,
            fat: fat,
            carb: carb
        }

        return state;
    }
    
    return (
        <>
            <FormRow className="md:grid-cols-6">
                <FormLabel className="col-span-2">Your weight</FormLabel>
                <div className='col-span-2'>
                    <InputWithSide
                        value={state.weight}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('weight', event.currentTarget.value)}
                        placeholder="Weight"
                        sideLabel="kg"
                    />
                </div>
            </FormRow>
            <FormRow className="md:grid-cols-6">
                <FormLabel className="col-span-2">Desired day calories</FormLabel>
                <div className='col-span-2'>
                    <InputWithSide
                        value={state.calorie}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('calorie', event.currentTarget.value)}
                        type="text"
                        placeholder="Calories"
                        sideLabel="kcal"
                    />
                </div>
            </FormRow>
            <FormRow className="md:grid-cols-6">
                <FormLabel className="col-span-2">Proteins:</FormLabel>
                <div className='text-xl col-span-1'><b className="inline-block">{state.protein}</b> g</div>
                <div className='text-xl col-span-3'>
                    <Range
                        min={proteinKoeffRange[0]}
                        max={proteinKoeffRange[1]}
                        step={0.1}
                        value={state.proteinKoeff}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('proteinKoeff', event.currentTarget.value)}
                    /> g/kg
                </div>
            </FormRow>
            <FormRow className="md:grid-cols-6">
                <FormLabel className="col-span-2">Fats:</FormLabel>
                <div className='text-xl col-span-1'><b className="inline-block">{state.fat}</b> g</div>
                <div className='text-xl col-span-3'>
                    <Range
                        min={fatKoeffRange[0]}
                        max={fatKoeffRange[1]}
                        step={0.1}
                        value={state.fatKoeff}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('fatKoeff', event.currentTarget.value)}
                    /> g/kg
                </div>
            </FormRow>
            <FormRow className="md:grid-cols-6">
                <FormLabel className="col-span-2">Carbs:</FormLabel>
                <div className='text-xl col-span-4'><b>{state.carb}</b> g</div>
            </FormRow>
        </>
    );
};

export default GlassPlate(CalorieCalc, 'calorie-calc w-[600px] max-w-full');