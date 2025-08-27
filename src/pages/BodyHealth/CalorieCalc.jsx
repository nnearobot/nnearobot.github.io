import { useState, useEffect } from 'react';

import { InputWithSide, Range, FormRow, FormLabel } from '../../components/UI';

import styles from "./BodyHealthPage.module.scss";

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
    }, []);

    const handleOnchange = (name, value) => {
        // only digits and dot are allowed:
        if (!/^\d*\.?\d*$/.test(value)) {
            return;
        }

        let newState = calc({ ...state, [name]: value });

        setState(newState);
    }

    function calc(state) {
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
        <div className={styles.calorieCalc}>
            <FormRow className="sm:grid-cols-6">
                <FormLabel className="col-span-2">Your weight</FormLabel>
                <div className='col-span-2'>
                    <InputWithSide
                        id="calorie-calc-weight"
                        className={styles.inputDigital}
                        value={state.weight}
                        onChange={(event) => handleOnchange('weight', event.currentTarget.value)}
                        placeholder="Weight"
                        sideLabel="kg"
                    />
                </div>
            </FormRow>
            <FormRow className="sm:grid-cols-6">
                <FormLabel className="col-span-2">Desired day calories</FormLabel>
                <div className='col-span-2'>
                    <InputWithSide
                        id="calorie-calc-calories"
                        className={styles.inputDigital}
                        value={state.calorie}
                        onChange={(event) => handleOnchange('calorie', event.currentTarget.value)}
                        type="text"
                        placeholder="Calories"
                        sideLabel="kcal"
                    />
                </div>
            </FormRow>
            <FormRow className="sm:grid-cols-6">
                <FormLabel className="col-span-2">Proteins:</FormLabel>
                <div className='sm:text-xl col-span-1'><span className={styles.result}>{state.protein}</span>&thinsp;g</div>
                <div className='sm:text-xl col-span-3 mb-4 sm:mb-0'>
                    <Range
                        min={proteinKoeffRange[0]}
                        max={proteinKoeffRange[1]}
                        step={0.1}
                        value={state.proteinKoeff}
                        onChange={(event) => handleOnchange('proteinKoeff', event.currentTarget.value)}
                    />&thinsp;g/kg
                </div>
            </FormRow>
            <FormRow className="sm:grid-cols-6">
                <FormLabel className="col-span-2">Fats:</FormLabel>
                <div className='sm:text-xl col-span-1'><span className={styles.result}>{state.fat}</span>&thinsp;g</div>
                <div className='sm:text-xl col-span-3 mb-4 sm:mb-0'>
                    <Range
                        min={fatKoeffRange[0]}
                        max={fatKoeffRange[1]}
                        step={0.1}
                        value={state.fatKoeff}
                        onChange={(event) => handleOnchange('fatKoeff', event.currentTarget.value)}
                    />&thinsp;g/kg
                </div>
            </FormRow>
            <FormRow className="sm:grid-cols-6">
                <FormLabel className="col-span-2">Carbs:</FormLabel>
                <div className={styles.result}><b>{state.carb}</b>&thinsp;g</div>
            </FormRow>
        </div>
    );
};

export default CalorieCalc