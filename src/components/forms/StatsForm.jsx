import React, {  useState, useEffect } from 'react';
import { INIT_STATS } from '../../data/constants';
import ToggleCheckbox from '../UI/ToggleCheckbox';
import InputHeight from '../UI/InputHeight';
import Button from '../UI/Button';
import Input from '../UI/Input';

function StatsForm({ data, title }){
    const [standard, setStandard] = useState('Metric');
    const [isReady, setAvailability] = useState(true);
    const [formValues, setFormValues] = useState(INIT_STATS);
    useEffect(() => {console.log('data', data) }, []);

    const handleFormUpdate = (target, val) => {
        console.log(formValues, target, val);
        setFormValues({ ...formValues, [target]: val });
    }

    const handleCancel = () => { console.log('handleCancel') }
    const handleSave = () => { console.log('handleSave') }

    return (
        <form>
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
            <Input inputType="number" inputVal={formValues.left_arm || ''} label="Right arm cm" targetVal="right_arm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.right_arm || ''} label="Left arm cm" targetVal="left_arm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.right_forearm || ''} label="Right forearm cm" targetVal="right_forearm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.left_forearm || ''} label="Left forearm cm" targetVal="left_forearm" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.right_leg || ''} label="Right leg cm" targetVal="right_leg" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.left_leg || ''} label="Left leg cm" targetVal="left_leg" updateForm={handleFormUpdate} />
            <div className="action-container">
                <Button handleClick={handleCancel} styleName="action-container__btn--secondary">Cancel</Button>
                <Button handleClick={handleSave} isDisabled={!isReady} styleName="action-container__btn--primary">Save</Button>
            </div>
        </form>);
}

export default StatsForm;