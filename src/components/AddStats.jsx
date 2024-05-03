import React, { useState } from 'react';
import Input from './UI/Input';
import Button from './UI/Button';
import { useAuth } from '../hooks/useAuth';
import InputHeight from './UI/InputHeight';
import ToggleCheckbox from './UI/ToggleCheckbox';
import { useNavigate } from 'react-router-dom';

export default function AddStats() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const initStats = {
        date: null,
        age: null,
        weight: null,
        body_fat: null,
        height: null,
        neck: null,
        chest: null,
        belly: null,
        butt: null,
        left_arm: null,
        right_arm: null,
        left_forearm: null,
        right_forearm: null,
        left_leg: null,
        right_leg: null
    }

    const [standard, setStandard] = useState('Metric');
    const [isReady, setAvailability] = useState(true);
    const [formValues, setFormValues] = useState(initStats);

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
        setAvailability(false)
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/stats/create`, { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        const data = response.json();
        data.message ? alert("Login Failed", data.message) : navigate('/work-report/hub/reports');
        setAvailability(true)
    }

    return (
        <form>
            <h2>Add Stats</h2>
            <Input inputType="date" inputVal={formValues.date || ''} label="Date" targetVal="date" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.age || ''} label="Age" targetVal="age" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.weight || ''} label="Weight in lbs" targetVal="weight" updateForm={handleFormUpdate} />
            <ToggleCheckbox updateForm={(val) => setStandard(val)} label={standard} />
            <InputHeight standard={standard} updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.body_fat || ''} label="Body Fat %" targetVal="body_fat" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.neck || ''} label="Neck cm" targetVal="neck" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.chest || ''} label="Chest cm" targetVal="chest" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.belly || ''} label="Belly cm" targetVal="belly" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.butt || ''} label="Butt cm" targetVal="butt" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.left_arm || ''} label="Right arm cm" targetVal="right_arm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.right_arm || ''} label="Left arm cm" targetVal="left_arm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.right_forearm || ''} label="Right forearm cm" targetVal="right_forearm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.left_forearm || ''} label="Left forearm cm" targetVal="left_forearm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.right_leg || ''} label="Right leg cm" targetVal="right_leg" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.left_leg || ''} label="Left leg cm" targetVal="left_leg" updateForm={handleFormUpdate} />
            <div className="action-container">
                <Button handleClick={handleCancel} styleName="action-container__btn--secondary">Cancel</Button>
                <Button isDisabled={!isReady} handleClick={handleSave} styleName="action-container__btn--primary">Save</Button>
            </div>
        </form>)
}