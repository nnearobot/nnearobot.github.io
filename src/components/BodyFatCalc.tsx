import React, { useState } from 'react';
import NnInput from './UI/input/NnInput';
import NnRadioButton from './UI/radioButton/NnRadioButton';

type stateType = {
    female: boolean; // true = female, false = male
    neck: string;
    waist: string;
    hips: string;
    weight: string;
    height: string;
    bodyFat: number;
}

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
    
    const handleOnSexCheck = (value: string) => {
        calc({ ...state, female: value === "1" });
    }

    const handleOnchange = (name: string, value: string) => {
        calc({ ...state, [name]: value });
    }

    function calc(state: stateType): void {
        let fat1 = 0, fat2 = 0, fat3 = 0;

        let count = 0;
        if (state.waist && state.neck && state.height) {
            if (state.female) {
                // BF%cal (women) = 19.2 – 0.239H + 0.8A – 0.5N
                fat1 = 19.2 - 0.239 * parseInt(state.height) +  0.8 * parseInt(state.waist) - 0.5 * parseInt(state.neck);
            } else {
                // BF%cal (men) = 10.1 – 0.239H + 0.8A – 0.5N
                fat1 = 10.1 - 0.239 * parseInt(state.height) +  0.8 * parseInt(state.waist) - 0.5 * parseInt(state.neck);
            }
            count++;
        }

        if (state.waist && state.neck && state.height && (!state.female || state.hips)) {
            if (state.female) {
                //163.205 × log10 [abdomen + hip – neck (in)] – 97.684 x log10 [height (in)] − 78.387
                fat2 = 163.205 * Math.log10((parseInt(state.waist) + parseInt(state.hips) - parseInt(state.neck)) / 2.54) - 97.684 * Math.log10(parseInt(state.height) / 2.54) - 78.387;
            } else {
                // 86.010 × log10 [abdomen – neck (in)] - 70.041 × log10 [height (in)] + 36.76
                fat2 = 86.010 * Math.log10((parseInt(state.waist) - parseInt(state.neck)) / 2.54) - 70.041 * Math.log10(parseInt(state.height) / 2.54) + 36.76;
            }
            count++;
        }

        if (state.weight && state.height) {
            let bmi = parseInt(state.weight) / (parseInt(state.height) * parseInt(state.height) / 10000);
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
        let fat = (fat1 + fat2 + fat3) / count;

        let newState = {
            ...state,
            bodyFat: Math.round(fat * 100) / 100
        }

        setState(newState);
    }
    
    return (
        <div className="calorie-calc">
            <form>
                <div className='row mb-1'>
                    <label className='col-md-3 col-lg-2 col-form-label'>Your sex</label>
                    <div className='col-md-9 col-lg-10'>
                        <div className="mb-2"><label><NnRadioButton
                            value={1}
                            checked={state.female ? "checked" : ""}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnSexCheck(event.currentTarget.value)}
                        /> Female</label></div>
                        <div className="mb-2"><label><NnRadioButton
                            value={0}
                            checked={!state.female ? "checked" : ""}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnSexCheck(event.currentTarget.value)}
                        /> Male</label></div>
                    </div>
                </div>
                <div className='row mb-1'>
                    <label className='col-md-3 col-lg-2'>Your weight</label>
                    <div className='col-md-9 col-lg-2'>
                        <div className='input-group'>
                            <NnInput
                                value={state.weight}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('weight', event.currentTarget.value)}
                                type="text"
                                placeholder="Weight"
                            />                        
                            <span className="input-group-text">kg</span>
                        </div>
                    </div>
                </div>
                <div className='row mb-1'>
                    <label className='col-md-3 col-lg-2 col-form-label'>Your height</label>
                    <div className='col-md-3 col-lg-2'>
                        <div className='input-group'>
                            <NnInput
                                value={state.height}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('height', event.currentTarget.value)}
                                type="text"
                                placeholder="Height"
                            />
                            <span className="input-group-text">cm</span>
                        </div>
                    </div>
                    <div className='col-md-6 col-lg-8 small'></div>
                </div>
                <div className='row mb-1'>
                    <label className='col-md-3 col-lg-2'>Your waist</label>
                    <div className='col-md-3 col-lg-2'>
                        <div className='input-group'>
                            <NnInput
                                value={state.waist}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('waist', event.currentTarget.value)}
                                type="text"
                                placeholder="Waist"
                            />                        
                            <span className="input-group-text">cm</span>
                        </div>
                    </div>
                    <div className='col-md-6 col-lg-8 small'>
                        {state.female
                            ? "measured at the natural waistline (or the smallest waist circumference) and rounded down"
                            : "measured at the navel and rounded down"
                        }
                    </div>
                </div>
                <div className={`row mb-1 ${state.female ? "d-flex" : "d-none"}`}>
                    <label className='col-md-3 col-lg-2 col-form-label'>Your hips</label>
                    <div className='col-md-3 col-lg-2'>
                        <div className='input-group'>
                            <NnInput
                                value={state.hips}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('hips', event.currentTarget.value)}
                                type="text"
                                placeholder="Hips"
                            />                        
                            <span className="input-group-text">cm</span>
                        </div>
                    </div>
                    <div className='col-md-6 col-lg-8 small'>measured at the largest protrusion of the buttocks</div>
                </div>
                <div className='row mb-3'>
                    <label className='col-md-3 col-lg-2 col-form-label'>Your neck</label>
                    <div className='col-md-3 col-lg-2'>
                        <div className='input-group'>
                            <NnInput
                                value={state.neck}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => handleOnchange('neck', event.currentTarget.value)}
                                type="text"
                                placeholder="Neck"
                            />                        
                            <span className="input-group-text">cm</span>
                        </div>
                    </div>
                    <div className='col-md-6 col-lg-8 small'>measured right below the voicebox and rounded up</div>
                </div>

                <div className='row mb-3'>
                    <label className='col-md-3 col-lg-2 col-form-label'>Yor body fat percentage:</label>
                    <div className='col-md-9 col-lg-10 fs-5'><b>
                        {state.bodyFat}%
                    </b></div>
                </div>
            </form>
        </div>
    );
};

export default BodyFatCalc;