import React from 'react';



const InputRange = ({updateForm, label, targetVal, inputVal, inputType, rangeValAndLabels, children})=>{
    const options = rangeValAndLabels && rangeValAndLabels.map(vm => <option value={vm.val} label={vm.label}></option>);

    return(
        <>
    <label for={targetVal}>{label + ' ' + inputVal}</label><br />
    <input type="range" id={{ targetVal }} name={{ targetVal }} onChange={(e => updateForm(targetVal, e.target.value))} list="values" />

    <datalist id="values">
        {options}

    </datalist>
    </>
    );
}


export default InputRange;