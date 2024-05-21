import { useState } from 'react';
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import Select from '../../components/UI/Select'
import { MUSCLE_GROUPS, PRIMARY_MUSCLES } from '../../data/constants';
import { useData } from '../../hooks/useData';
import Alert from '../../components/UI/Alert';

const ExerciseForm = ({ title, initData, isEditing }) => {
    const [formValues, setFormValues] = useState({ ...initData });
    const [isReady, setAvailability] = useState(true);
    const [showClientError, setClientFailedAlert] = useState(false);
    const [showServerError, setServerFailedAlert] = useState(false);
    const [showSuccess, setSuccessAlert] = useState(false);
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
        setFormValues({ ...initData });
    }

    const handleSave = (e) => {
        e.preventDefault();
        setAvailability(false);
        isEditing ? patchExercise() : postExercise();
    }

    const postExercise = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises/create_exercise`, { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
            const { message } = await response.json();
            if (message) {
                setClientFailedAlert(true);
                setTimeout(() => setClientFailedAlert(false), 7000);
            } else {
                setSuccessAlert(true);
                setTimeout(() => setSuccessAlert(false), 7000);
                updateExercises();
            }
        } catch (err) {
            console.error(err);
            setServerFailedAlert(true)
            setTimeout(() => setServerFailedAlert(false), 7000);
        }
        setAvailability(true);
    }

    const patchExercise = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises/${formValues._id}/update_exercise`, { method: 'PUT', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
            const { message } = await response.json();
            if (message) {
                setClientFailedAlert(true);
                setTimeout(() => setClientFailedAlert(false), 7000);
            } else {
                setSuccessAlert(true);
                setTimeout(() => setSuccessAlert(false), 7000);
            }
        } catch (err) {
            console.error(err);
            setServerFailedAlert(true)
            setTimeout(() => setServerFailedAlert(false), 7000);
        }
        setAvailability(true);
    }
    const muscleGroupOptions = MUSCLE_GROUPS.map((o, idx) => {
        return <option key={`option${idx}-${o}`} value={o.toLowerCase()}>{o}</option>
    })
    const balanceOptions = ["Symmetrical", "Asymmetrical"].map((o, idx) => {
        return <option key={`option${idx}-${o}`} value={o.toLowerCase()}>{o}</option>
    });
    const primaryMuscleOptions = PRIMARY_MUSCLES[formValues.muscle_group] && PRIMARY_MUSCLES[formValues.muscle_group].map((o, idx) => {
        return <option key={`option${idx}-${o}`} value={o.toLowerCase()}>{o}</option>
    });

    return (<>
        <form className="FormWR" onSubmit={handleSave}>
            <h2 className="form-title">{title}</h2>
            <Input
                label="Name"
                inputVal={formValues.name || ''}
                targetVal="name"
                validations={{ required: true }}
                updateForm={handleFormUpdate}><span className="requiredMark">*</span></Input>
            <Select
                label="Balance"
                updateForm={handleFormUpdate}
                selectedVal={formValues['balance'] || 'Select form'}
                nameForId="balance"
                validations={{ required: true }}
                options={balanceOptions}><span className="requiredMark">*</span></Select>
            <Select
                label="Muscle Group"
                updateForm={handleFormUpdate}
                selectedVal={formValues['muscle_group'] || 'Choose a muscle group'}
                nameForId="muscle_group"
                validations={{ required: true }}
                options={muscleGroupOptions}><span className="requiredMark">*</span></Select>
            {formValues["muscle_group"] ?
                <Select
                    label="Primary Muscle"
                    updateForm={handleFormUpdate}
                    selectedVal={formValues['primary_muscle'] || 'Select a primary muscle'}
                    nameForId={"primary_muscle"}
                    validations={{ required: true }}
                    options={primaryMuscleOptions}><span className="requiredMark">*</span></Select> : null}
            <div className="action-container">
                <Button
                    handleClick={handleCancel}
                    isDisabled={!isReady}
                    styleName="action-container__btn--secondary">CANCEL</Button>
                <Button
                    inputType="save"
                    isDisabled={!isReady}
                    styleName="action-container__btn--primary">SAVE</Button>
            </div>
        </form>
        { showSuccess ? <Alert handleClick={() => setSuccessAlert(false)} alertType="__success" message={`Successfully ${isEditing ? "updated" : "added"} exercises!`} /> : null}
        { showClientError ? <Alert handleClick={() => setClientFailedAlert(false)} alertType="__fail" message={`${isEditing ? 'Edit' : 'Add'} exercise unexpectedly failed. Please try again.`} /> : null}
        { showServerError ? <Alert handleClick={() => setServerFailedAlert(false)} alertType="__fail" message={`${isEditing ? 'Edit' : 'Add'} exercise request failed. Servers are down. Please try again later.`} /> : null}
    </>);
}

export default ExerciseForm;