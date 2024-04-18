import React from 'react';
// interface IOption  {
//     displayName:String,
//     value:String;
// }

const Select = ({ updateForm, selectedVal, nameForId, options, label }) => {
    const optionsList = options.map((o, idx) => {
        return <option key={`option-${o}${idx}`} value={o.displayName.toLowerCase()}>{o.displayName}</option>
    })
    return (
        <div className="SelectComponent">
            <label htmlFor={nameForId}>{label}</label>
            <select value={selectedVal} onChange={(e) => updateForm(nameForId, e.target.value)} name={nameForId} id={nameForId}>
                <option value="">Choose an option</option>
                {optionsList}
            </select>
        </div>
    )
}

export default Select;