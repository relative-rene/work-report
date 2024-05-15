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
            setFormValues({ ...formValues, primary_muscle: "", [target]: val });
        } else {
            setFormValues({ ...formValues, [target]: val });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setFormValues({ name: "", muscle_group: "", primary_muscle: "", balance: "" });
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
        response.message ? alert(`Failure: ${response.statusText}`) : alert('Success');
    }

    const patchExercise = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises/${formValues._id}/update_exercise`, { method: 'PUT', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        response.message ? alert(`Failure: ${response.statusText}`) : alert('Success');
    }
    const muscleGroupOptions = MUSCLE_GROUPS.map((o, idx) => {
        return <option key={`option${idx}-${o}`} value={o.toLowerCase()}>{o}</option>
    })
    const balanceOptions = ["Symmetrical","Asymmetrical"].map((o, idx) => {
        return <option key={`option${idx}-${o}`} value={o.toLowerCase()}>{o}</option>
    });
    const primaryMuscleOptions = PRIMARY_MUSCLES[formValues.muscle_group] && PRIMARY_MUSCLES[formValues.muscle_group].map((o,idx)=>{
        return <option key={`option${idx}-${o}`} value={o.toLowerCase()}>{o}</option>
    });

    return (<form className="FormWR">
        <h2 className="form-title">{title}</h2>
        <Input
            label="Name"
            inputVal={formValues.name || ''}
            targetVal="name"
            updateForm={handleFormUpdate} />
        <Select
            label="Balance"
            updateForm={handleFormUpdate}
            selectedVal={formValues['balance'] || 'Select form'}
            nameForId="balance"
            options={balanceOptions} />
        <Select
            label="Muscle Group"
            updateForm={handleFormUpdate}
            selectedVal={formValues['muscle_group'] || 'Choose a muscle group'}
            nameForId="muscle_group"
            options={muscleGroupOptions} />
        {formValues["muscle_group"] &&
            <Select
                label="Primary Muscle"
                updateForm={handleFormUpdate}
                selectedVal={formValues['primary_muscle'] || 'Select a primary muscle'}
                nameForId={"primary_muscle"}
                options={primaryMuscleOptions} />}
        <div className="action-container">
            <Button
                handleClick={handleCancel}
                styleName="action-container__btn--secondary">Cancel</Button>
            <Button
                handleClick={handleSave}
                isDisabled={!isReady}
                styleName="action-container__btn--primary">Save</Button>
        </div>
    </form>);
}

export default ExerciseForm;