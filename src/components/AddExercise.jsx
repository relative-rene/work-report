import React, { useState } from 'react';
import Input from './UI/Input';
import Button from './UI/Button'
import Select from './UI/Select'
import { MUSCLE_GROUPS, PRIMARY_MUSCLES } from '../data/constants';


export const AddExercise = () => {
    const [formValues, setFormValues] = useState({ name: null, balance: null, muscle_group: null, primary_muscle: null });

    const handleFormUpdate = (target, val) => {
        if (target === 'muscle_group') {
            setFormValues({ ...formValues, primary_muscle: null, [target]: val });
        } else {
            setFormValues({ ...formValues, [target]: val });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setFormValues({ name: null, muscle_group: null, primary_muscle: null, balance:null });
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises/create`, { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
            response.status < 300 ? alert('Success') : alert('Failure: ', response.statusText);
    }


    return (
        <form>
            <h2>Add Exercise</h2>
            <Input inputVal={formValues.name || ''} label="Name" targetVal="name" updateForm={handleFormUpdate} />
            <Select
                updateForm={handleFormUpdate}
                selectedVal={formValues['balance'] || 'Select form'}
                nameForId="balance"
                label="Balance"
                options={[{ displayName: "Symmetrical"}, {displayName: "Asymmetrical" },]} />
            <Select
                updateForm={handleFormUpdate}
                selectedVal={formValues['muscle_group'] || 'Choose a muscle group'}
                nameForId="muscle_group"
                label="Muscle Group"
                options={MUSCLE_GROUPS} />
            {formValues["muscle_group"] &&
                <Select
                    updateForm={handleFormUpdate}
                    selectedVal={formValues['primary_muscle'] || 'Select a primary muscle'}
                    nameForId={"primary_muscle"}
                    label="Primary Muscle"
                    options={PRIMARY_MUSCLES[formValues.muscle_group]} />}
            <div className="action-container">
                <Button handleClick={handleCancel} styleName="btn-secondary">Cancel</Button>
                <Button handleClick={handleSave} styleName="btn-primary">Save</Button>
            </div>
        </form>)

}


export default AddExercise;