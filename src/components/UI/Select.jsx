

const Select = ({ updateForm, selectedVal, nameForId, options, label }) => {

    return (
        <div className="SelectComponent">
            <label htmlFor={nameForId}>{label}</label>
            <select value={selectedVal} onChange={(e) => updateForm(nameForId, e.target.value)} name={nameForId} id={nameForId}>
                <option value="">Choose an option</option>
                {options}
            </select>
        </div>
    )
}

export default Select;