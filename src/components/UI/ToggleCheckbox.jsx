import React from 'react';


const ToggleCheckbox = ({ updateForm, label }) => {
    const handleToggle = (e) => {
        const standard = e.target.checked ? 'Imperical' : 'Metric';
        updateForm(standard);
    }
    return (
        <div className="ToggleCheckbox">
            <span>{label}</span>
            <label className="__switch">
                <input onChange={handleToggle} type="checkbox" />
                <span className="__slider --round"></span>
            </label>
        </div>
    );

}



export default ToggleCheckbox;