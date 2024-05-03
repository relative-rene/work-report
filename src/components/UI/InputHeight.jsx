import React, { useState } from 'react';



const InputHeight = ({ updateForm, standard }) => {
        const [feet, setFeet] = useState(0);
        const [inches, setInches] = useState(0);
        const [impericalConverted, setConverted] = useState(0)
        const [cm, setCM] = useState(0);

        const handleInput = (val, targetVal) => {
                if (standard === 'Imperical') {
                targetVal === 'feet'? setFeet(val): setInches(val);
                        const height = ((feet * 30.48) + (inches * 2.54)).toFixed();
                        setConverted(height)
                        updateForm('height', height);
                } else {
                        updateForm('height', val);
                        setCM(val)
                }
        }

        return (
                standard === 'Imperical' ?
                        <div className="InputHeight">
                                <label>Height</label><br /><br />
                                <label htmlFor="">Feet
                        </label>
                                <input max="8" type="number" value={feet} onChange={(e) => handleInput(e.target.value, 'feet',)} />
                                <label htmlFor=""> Inches
                        </label>
                                <input min="0" max="12" type="number" value={inches} onChange={(e) => handleInput(e.target.value, 'inches')} />
                        </div> :
                        < div className="InputComponent">
                                <label>Height in cm</label>
                                <input type="number" value={cm} onChange={(e) => handleInput(e.target.value)} />
                        </div>
        );
}

export default InputHeight;