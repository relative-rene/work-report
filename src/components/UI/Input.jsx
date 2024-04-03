import React from 'react'

const Input = ({ updateForm, label, targetVal, inputVal, inputType, children }) => {
    return (
            <div className="Input">
                <label>{label}  {children}
                    <input value={inputVal} onChange={(e => updateForm(targetVal, e.target.value))} type={inputType || "text"} />
                </label>
            </div> 
    )
}

export default Input;
