import React, { useState } from 'react';
import ToggleCheckbox from '../UI/ToggleCheckbox';
import InputHeight from '../UI/InputHeight';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { formatUSDateToIsoString } from '../../utility/transformers';

function StatsForm({ initData, title, isEditing }) {
    const [standard, setStandard] = useState('Metric');
    const [isReady, setAvailability] = useState(true);
    const [formValues, setFormValues] = useState({ ...initData, date: initData.date? formatUSDateToIsoString(initData.date):'' });
    const { user } = useAuth();
    const { updateStats } = useData();

    const handleFormUpdate = (target, val) => {
        setFormValues({ ...formValues, [target]: val });
    }

    const handleCancel = () => (console.log('handleCancel'));// TODO make functional

    const handleSave = async (e) => {
        e.preventDefault()
        setAvailability(false)
        isEditing ? await patchStats() : await postStats();
        setAvailability(true);
    }

    const postStats = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/create_stats`, { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        const data = response.json()
        data.message ? alert(`Add Stats FAILED" ${data.message}`) : alert(`Add Stats SUCCEED`);
        updateStats();

    }

    const patchStats = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/${formValues._id}/patch_stats`, { method: 'PUT', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        const data = response.json();
        data.message ? alert(`Add Stats FAILED ${data.message}`) : alert(`Add Stats SUCCEED`);
        updateStats();

    }

    return (
        <form className="FormWR" onSubmit={handleSave}>
            <h2 className="form-title">{title}</h2>
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
            <Input inputType="number" inputVal={formValues.left_arm || ''} label="Left Arm cm" targetVal="left_arm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.right_arm || ''} label="Right Arm cm" targetVal="right_arm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.left_forearm || ''} label="Left Forearm cm" targetVal="left_forearm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.right_forearm || ''} label="Right Forearm cm" targetVal="right_forearm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.left_leg || ''} label="Left Leg cm" targetVal="left_leg" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.right_leg || ''} label="Right Leg cm" targetVal="right_leg" updateForm={handleFormUpdate} />
            <div className="action-container">
                <Button handleClick={handleCancel} styleName="action-container__btn--secondary">Cancel</Button>
                <Button isDisabled={!isReady} styleName="action-container__btn--primary" inputType="save">Save</Button>
            </div>
        </form>);
}

export default StatsForm;