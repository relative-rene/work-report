import { useState } from 'react';
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import Select from '../../components/UI/Select'
import { MUSCLE_GROUPS, PRIMARY_MUSCLES } from '../../data/constants';
import { useData } from '../../hooks/useData';

const ExerciseForm = ({ title, initData, isEditing }) => {
    const [formValues, setFormValues] = useState({ ...initData });
    const [isReady, setAvailability] = useState(true);
    const { updateExercises } = useData();

    const handleFormUpdate = (target, val) => {
        if (target === 'muscle_group') {
            setFormValues({ ...formValues, primary_muscle: null, [target]: val });
        } else {
            setFormValues({ ...formValues, [target]: val });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setFormValues({ name: null, muscle_group: null, primary_muscle: null, balance: null });
    }

    const handleSave = (e) => {
        e.preventDefault();
        setAvailability(false);
        isEditing ? patchExercise() : postExercise();
        setAvailability(true);
        updateExercises();
    }

    const postExercise = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises/create_exercise`, { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        response.message ? alert('Failure: ', response.statusText) : alert('Success');
    }

    const patchExercise = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises/${formValues._id}/update_exercise`, { method: 'PUT', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        response.message ? alert('Failure: ', response.statusText) : alert('Success');
    }
    const muscleGroupOptions = MUSCLE_GROUPS.map((o, idx) => {
        return <option key={`option-${o}${idx}`} value={o.displayName.toLowerCase()}>{o.displayName}</option>
    })
    const balanceOptions = [{ displayName: "Symmetrical" }, { displayName: "Asymmetrical" }].map((o, idx) => {
        return <option key={`option-${o}${idx}`} value={o.displayName.toLowerCase()}>{o.displayName}</option>
    })

    return (<form className="FormWR">
        <h2 className="form-title">{title}</h2>
        <Input inputVal={formValues.name || ''} label="Name" targetVal="name" updateForm={handleFormUpdate} />
        <Select
            updateForm={handleFormUpdate}
            selectedVal={formValues['balance'] || 'Select form'}
            nameForId="balance"
            label="Balance"
            options={balanceOptions} />
        <Select
            updateForm={handleFormUpdate}
            selectedVal={formValues['muscle_group'] || 'Choose a muscle group'}
            nameForId="muscle_group"
            label="Muscle Group"
            options={muscleGroupOptions} />
        {formValues["muscle_group"] &&
            <Select
                updateForm={handleFormUpdate}
                selectedVal={formValues['primary_muscle'] || 'Select a primary muscle'}
                nameForId={"primary_muscle"}
                label="Primary Muscle"
                options={PRIMARY_MUSCLES[formValues.muscle_group]} />}
        <div className="action-container">
            <Button handleClick={handleCancel} styleName="action-container__btn--secondary">Cancel</Button>
            <Button isDisabled={!isReady} handleClick={handleSave} styleName="action-container__btn--primary">Save</Button>
        </div>
    </form>);
}

export default ExerciseForm;