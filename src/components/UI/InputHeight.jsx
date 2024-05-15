import React, { useState } from 'react';



const InputHeight = ({ updateForm, standard }) => {
        const [cm, setCM] = useState(0);

        const convertImpericalHeight = (e) => {
                let [feet, inches] = e.target.form;
                feet = feet.value || 0;
                inches = inches.value || 0;
                const height = ((feet * 30.48) + (inches * 2.54)).toFixed();
                updateForm('height', height);
        }

        const handleMetricInput = (e) => {
                updateForm('height', e.target.value);
                setCM(e.target.value)
        }

        return (
                standard === 'Imperical' ?
                        <div className="InputHeight">
                                <form method="POST">
                                        <label>Height</label><br />
                                        <label htmlFor="feet">Feet </label>
                                        <input max="8" type="number" onChange={convertImpericalHeight} />
                                        <label htmlFor="inches"> Inches </label>
                                        <input min="0" max="12" type="number" onChange={convertImpericalHeight} />
                                </form>
                        </div> :

                        < div className="InputComponent">
                                <label>Height in cm
                                        <input type="number" value={cm} onChange={handleMetricInput} />
                                </label>
                        </div>
        );
}

export default InputHeight;