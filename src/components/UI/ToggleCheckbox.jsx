import React from 'react';


const ToggleCheckbox = ({ updateForm, label }) => {
    const handleToggle = (e) => {
        const standard = e.target.checked ? 'Imperical' : 'Metric';
        updateForm(standard);
    }
    return (
        <div className="ToggleCheckbox">
            <span>{label}</span>
            <label className="switch">
                <input onChange={handleToggle} type="checkbox" />
                <span className="slider round"></span>
            </label>
        </div>
    );

}



export default ToggleCheckbox;