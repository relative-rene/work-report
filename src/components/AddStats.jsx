import React, { useState } from 'react';
import Select from './UI/Select';
import Input from './UI/Input';
import Button from './UI/Button';
import { useAuth } from '../hooks/useAuth';
import InputHeight from './UI/InputHeight';
import ToggleCheckbox from './UI/ToggleCheckbox';
export default function AddStats() {
    const { user } = useAuth();
    const [standard, setStandard] = useState('Metric');

    const [formValues, setFormValues] = useState({
        weight: null,
        height: null,
        age: null,
        gender: null,
        chest: null,
        abs: null,
        thigh: null,
        tricep: null,
        suprailiac: null
    });

    const handleFormUpdate = (target, val) => {
        console.log(formValues, target, val);
            setFormValues({ ...formValues, [target]: val });
    }

    async function handleCancel(e) {
        e.preventDefault()
        setFormValues({ name: null, muscle_group: null, primary_muscle: null });
    }

    async function handleSave(e) {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_SERVER}api/profiles/${user._id}/stats/create`, { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        console.log(response);
    }
    return (
        <form action="POST">
            <h2>Add Stats</h2>
            <Input inputType="number" inputVal={formValues.weight || ''} label="Weight in lbs" targetVal="weight" updateForm={handleFormUpdate} />
            <ToggleCheckbox updateForm={(val)=>setStandard(val)} label={standard} />
            <InputHeight standard={standard} updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.age || ''} label="Age" targetVal="age" updateForm={handleFormUpdate} />
            <Select
                updateForm={handleFormUpdate}
                selectedVal={formValues['gender'] || 'Select Gender'}
                nameForId="gender"
                label="Gender"
                options={[{ displayName: 'Male' }, { displayName: 'Female' }]} />
            { formValues.gender === 'male' ?
                <>
                    <Input inputType="number" inputVal={formValues.chest || ''} label="Chest mm" targetVal="chest" updateForm={handleFormUpdate} />
                    <Input inputType="number" inputVal={formValues.abs || ''} label="Abs mm" targetVal="abs" updateForm={handleFormUpdate} />
                    <Input inputType="number" inputVal={formValues.thigh || ''} label="Thigh mm" targetVal="thigh" updateForm={handleFormUpdate} />
                </>
                :
                <>
                    <Input inputType="number" inputVal={formValues.tricep || ''} label="Tricep mm" targetVal="tricep" updateForm={handleFormUpdate} />
                    <Input inputType="number" inputVal={formValues.suprailiac || ''} label="Suprailiac mm" targetVal="suprailiac" updateForm={handleFormUpdate} />
                    <Input inputType="number" inputVal={formValues.thigh || ''} label="Thigh mm" targetVal="thigh" updateForm={handleFormUpdate} />
                </>
            }
            <div className="action-container">
                <Button handleClick={handleCancel} styleName="btn-secondary">Cancel</Button>
                <Button handleClick={handleSave} styleName="btn-primary">Save</Button>
            </div>
        </form>)
}