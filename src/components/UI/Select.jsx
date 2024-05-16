

const Select = ({ updateForm, selectedVal, nameForId, options, label,validations, children }) => {

    return (
        <div className="SelectComponent">
            <label htmlFor={nameForId}>{label}{children}</label>
            <select 
                required={validations ? validations.required : false} 
                value={selectedVal} 
                onChange={(e) => updateForm(nameForId, e.target.value)} 
                name={nameForId} 
                id={nameForId}>
                <option value="">Choose an option</option>
                {options}
            </select>
        </div>
    )
}

export default Select;