import React, { useState } from 'react';
import Input from './UI/Input';
import Select from './UI/Select';
import Button from './UI/Button';

const AddBodyFat = () => {
    const initiationValues = {
        date: null,
        age: null,
        weight: null,
        abs: null,
        chest: null,
        thigh: null,
        tricep: null,
        suprailiac: null,
        lean_body_mass: null,
        fat_mass: null,
        body_fat_percent: null
    }
    const [isReady, setAvailability] = useState(true);
    const [formValues, setFormValues] = useState(initiationValues);

    const maleCalculation = ({ abs, thigh, chest, age }) => {
        const SKINFOLD_SUM = Number(abs) + Number(thigh) + Number(chest);
        const BODY_DENSITY = (1.10938 - (0.0008267 * SKINFOLD_SUM)) + (0.0000016 * (SKINFOLD_SUM * SKINFOLD_SUM)) - 0.0002574 * age;
        const BODY_FAT_PERCENT = (495 / BODY_DENSITY) - 450;
        const BODY_FAT_WEIGHT = (Number(BODY_FAT_PERCENT) / 100) * Number(formValues.weight);
        const LEAN_BODY_MASS = Number(formValues.weight) - BODY_FAT_WEIGHT;
        setFormValues({ ...formValues, body_fat_percent: BODY_FAT_PERCENT.toFixed(2), lean_body_mass: LEAN_BODY_MASS.toFixed(2), fat_mass: BODY_FAT_WEIGHT.toFixed(2) })
        return BODY_FAT_PERCENT;
    }

    const femaleCalculation = ({ tricep, suprailiac, thigh, age }) => {
        const SKINFOLD_SUM = Number(tricep) + Number(suprailiac) + Number(thigh);
        const BODY_DENSITY = (1.0994921 - (0.0009929 * SKINFOLD_SUM)) + (0.0000023 * (SKINFOLD_SUM * SKINFOLD_SUM)) - 0.0001392 * age;
        const BODY_FAT_PERCENT = (495 / BODY_DENSITY) - 450;
        const BODY_FAT_WEIGHT = (Number(BODY_FAT_PERCENT) / 100) * Number(formValues.weight);
        const LEAN_BODY_MASS = Number(formValues.weight) - BODY_FAT_WEIGHT;
        setFormValues({ ...formValues, body_fat_percent: BODY_FAT_PERCENT.toFixed(2), lean_body_mass: LEAN_BODY_MASS.toFixed(2), fat_mass: BODY_FAT_WEIGHT.toFixed(2) });
        return BODY_FAT_PERCENT;
    }

    const handleFormUpdate = (target, val) => {
        setFormValues({ ...formValues, [target]: val })
    }

    const handleSubmit = () => {
        console.log(formValues.gender)
        const BF = formValues.gender === 'male' ? maleCalculation(formValues) : femaleCalculation(formValues);
        console.log('BF', BF)
    }
    const handleCancel = () => {
        console.log('cancel clicked');
    }
    return (
        <form className="FormWR">
            <h3>Body Fat Percentage</h3>
            <sub>Jackson and Pollock 3 Site skinfold</sub><br />
            <Input inputType="date" inputVal={formValues.date || ''} label="Day" targetVal="date" updateForm={handleFormUpdate} />
            <Input inputType="number" inputVal={formValues.weight || ''} label="Weight" targetVal="weight" updateForm={handleFormUpdate} />
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
                <Button handleClick={handleCancel} styleName="action-container__btn--secondary">Cancel</Button>
                <Button handleClick={handleSubmit} isDisabled={!isReady} styleName="action-container__btn--primary">Save</Button>
            </div>
        </form>
    )
}


export default AddBodyFat;