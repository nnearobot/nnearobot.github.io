import { useState } from 'react'

import { InputWithSide, RadioButton, QuestionCircle, FormRow, FormLabel } from '../../components/UI'

import styles from "./BodyHealthPage.module.scss";

const BodyFatCalc = function () {

    const initialState = {
        female: true,
        neck: "",
        waist: "",
        hips: "",
        weight: "",
        height: "",
        bodyFat: 0,
    };

    const [state, setState] = useState(initialState);

    const handleOnSexCheck = (value) => {
        calc({ ...state, female: value === "1" });
    }

    const handleOnchange = (name, value) => {
        // only digits and dot are allowed:
        if (!/^\d*\.?\d*$/.test(value)) {
            return;
        }

        calc({ ...state, [name]: value });
    }

    function calc(state) {
        let fat1 = 0, fat2 = 0, fat3 = 0;

        let count = 0;
        if (state.waist && state.neck && state.height) {
            if (state.female) {
                // BF%cal (women) = 19.2 – 0.239H + 0.8A – 0.5N
                fat1 = 19.2 - 0.239 * parseFloat(state.height) + 0.8 * parseFloat(state.waist) - 0.5 * parseFloat(state.neck);
            } else {
                // BF%cal (men) = 10.1 – 0.239H + 0.8A – 0.5N
                fat1 = 10.1 - 0.239 * parseFloat(state.height) + 0.8 * parseFloat(state.waist) - 0.5 * parseFloat(state.neck);
            }
            count++;
        }

        if (state.waist && state.neck && state.height && (!state.female || state.hips)) {
            if (state.female) {
                //163.205 × log10 [abdomen + hip – neck (in)] – 97.684 x log10 [height (in)] − 78.387
                fat2 = 163.205 * Math.log10((parseFloat(state.waist) + parseFloat(state.hips) - parseFloat(state.neck)) / 2.54) - 97.684 * Math.log10(parseFloat(state.height) / 2.54) - 78.387;
            } else {
                // 86.010 × log10 [abdomen – neck (in)] - 70.041 × log10 [height (in)] + 36.76
                fat2 = 86.010 * Math.log10((parseFloat(state.waist) - parseFloat(state.neck)) / 2.54) - 70.041 * Math.log10(parseFloat(state.height) / 2.54) + 36.76;
            }
            count++;
        }

        if (state.weight && state.height) {
            let bmi = parseFloat(state.weight) / (parseFloat(state.height) * parseFloat(state.height) / 10000);
            if (state.female) {
                // BF% females = 0.624 × BMI + 21.835
                fat3 = 0.624 * bmi + 21.835;
            } else {
                // BF% males = 1.050 × BMI − 4.001
                fat3 = 1.050 * bmi - 4.001;
            }
            count++;
        }

        // Average BF for 3 methods:
        let fat = count ? (fat1 + fat2 + fat3) / count : 0;

        let newState = {
            ...state,
            bodyFat: Math.round(fat * 100) / 100
        }

        setState(newState);
    }

    return (
        <div className={styles.bodyFatCalc}>
            <FormRow className="md:grid-cols-3">
                <FormLabel>Your sex</FormLabel>
                <div className='col-span-2'>
                    <div className="mb-2"><label><RadioButton
                        value={1}
                        checked={state.female ? "checked" : ""}
                        onChange={(event) => handleOnSexCheck(event.currentTarget.value)}
                    /> Female</label></div>
                    <div className="mb-2"><label><RadioButton
                        value={0}
                        checked={!state.female ? "checked" : ""}
                        onChange={(event) => handleOnSexCheck(event.currentTarget.value)}
                    /> Male</label></div>
                </div>
            </FormRow>
            <FormRow className="md:grid-cols-3">
                <FormLabel>Your weight</FormLabel>
                <div className='col-span-2'>
                    <InputWithSide
                        id="body-fat-weight"
                        className={styles.inputDigital}
                        value={state.weight}
                        onChange={(event) => handleOnchange('weight', event.currentTarget.value)}
                        placeholder="Weight"
                        sideLabel="kg"
                    />
                </div>
            </FormRow>
            <FormRow className="md:grid-cols-3">
                <FormLabel>Your height</FormLabel>
                <div className='col-span-2'>
                    <InputWithSide
                        id="body-fat-height"
                        className={styles.inputDigital}
                        value={state.height}
                        onChange={(event) => handleOnchange('height', event.currentTarget.value)}
                        placeholder="Height"
                        sideLabel="cm"
                    />
                </div>
            </FormRow>
            <FormRow className="md:grid-cols-3">
                <FormLabel>
                    Your waist <QuestionCircle title={state.female
                        ? "measured at the natural waistline (or the smallest waist circumference) and rounded down"
                        : "measured at the navel and rounded down"
                    } />
                </FormLabel>
                <div className='col-span-2'>
                    <InputWithSide
                        id="body-fat-waist"
                        className={styles.inputDigital}
                        value={state.waist}
                        onChange={(event) => handleOnchange('waist', event.currentTarget.value)}
                        placeholder="Waist"
                        sideLabel="cm"
                    />
                </div>
            </FormRow>
            <FormRow className="md:grid-cols-3">
                <FormLabel>Your neck <QuestionCircle title="measured right below the voicebox and rounded up" /></FormLabel>
                <div className='col-span-2'>
                    <InputWithSide
                        id="body-fat-neck"
                        className={styles.inputDigital}
                        value={state.neck}
                        onChange={(event) => handleOnchange('neck', event.currentTarget.value)}
                        placeholder="Neck"
                        sideLabel="cm"
                    />
                </div>
            </FormRow>
            {state.female && (
                <FormRow className={`md:grid-cols-3`}>
                    <FormLabel>Your hips <QuestionCircle title="measured at the largest protrusion of the buttocks" /></FormLabel>
                    <div className='col-span-2'>
                        <InputWithSide
                            id="body-fat-hips"
                            className={styles.inputDigital}
                            value={state.hips}
                            onChange={(event) => handleOnchange('hips', event.currentTarget.value)}
                            placeholder="Hips"
                            sideLabel="cm"
                        />
                    </div>
                </FormRow>
            )}
            <FormRow className="md:grid-cols-3">
                <FormLabel>Your body fat:</FormLabel>
                <div className={styles.result}>{state.bodyFat}%</div>
            </FormRow>
        </div>
    );
};

export default BodyFatCalc;