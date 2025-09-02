import { useState, useEffect } from 'react';

import { InputWithSide, Range, FormRow, FormCell } from '@/components/UI';

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
        <form className={`form-horizontal ${styles.calorieCalc}`}>
            <FormRow>
                <FormCell sm={4} as="label" htmlFor="calorie-calc-weight">Weight</FormCell>
                <FormCell sm={8}>
                    <InputWithSide
                        id="calorie-calc-weight"
                        className={styles.inputDigital}
                        value={state.weight}
                        onChange={(event) => handleOnchange('weight', event.currentTarget.value)}
                        placeholder="Weight"
                        sideLabel="kg"
                    />
                </FormCell>
            </FormRow>
            <FormRow>
                <FormCell sm={4} as="label" htmlFor="calorie-calc-calories">Desired day calories</FormCell>
                <FormCell sm={8}>
                    <InputWithSide
                        id="calorie-calc-calories"
                        className={styles.inputDigital}
                        value={state.calorie}
                        onChange={(event) => handleOnchange('calorie', event.currentTarget.value)}
                        type="text"
                        placeholder="Calories"
                        sideLabel="kcal"
                    />
                </FormCell>
            </FormRow>
            <FormRow className={styles.noMarginBottom}>
                <FormCell sm={4} as="label" htmlFor="calorie-calc-protein-rate">Protein rate</FormCell>
                <FormCell sm={8}>
                    <Range
                        id="calorie-calc-protein-rate"
                        label="&thinsp;g/kg"
                        min={proteinKoeffRange[0]}
                        max={proteinKoeffRange[1]}
                        step={0.1}
                        value={state.proteinKoeff}
                        onChange={(event) => handleOnchange('proteinKoeff', event.currentTarget.value)}
                    />
                </FormCell>
            </FormRow>
            <FormRow>
                <FormCell sm={4} as="label" htmlFor="calorie-calc-fat-rate">Fat rate</FormCell>
                <FormCell sm={8}>
                    <Range
                        id="calorie-calc-fat-rate"
                        label="&thinsp;g/kg"
                        min={fatKoeffRange[0]}
                        max={fatKoeffRange[1]}
                        step={0.1}
                        value={state.fatKoeff}
                        onChange={(event) => handleOnchange('fatKoeff', event.currentTarget.value)}
                    />
                </FormCell>
            </FormRow>
            <FormRow className={styles.resultRow}>
                <FormCell col={5} className={styles.resultLabel}>Proteins:</FormCell>
                <FormCell col={7} className={styles.result}><span>{state.protein}</span>&thinsp;g</FormCell>
            </FormRow>
            <FormRow className={styles.resultRow}>
                <FormCell col={5} className={styles.resultLabel}>Fats:</FormCell>
                <FormCell col={7} className={styles.result}><span>{state.fat}</span>&thinsp;g</FormCell>
            </FormRow>
            <FormRow className={styles.resultRow}>
                <FormCell col={5} className={styles.resultLabel}>Carbs:</FormCell>
                <FormCell col={7} className={styles.result}><span>{state.carb}</span>&thinsp;g</FormCell>
            </FormRow>
        </form>
    );
};

export default CalorieCalc