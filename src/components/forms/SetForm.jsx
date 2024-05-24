import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';
import Alert from '../../components/UI/Alert';

import { capitalizeStr, formatUSDateToIsoString } from '../../utility/transformers';

const SetForm = ({ initData, title, isEditing }) => {
    const { exercises, updateSets } = useData();
    const [isBtnReady, setBtnAvailability] = useState(true);
    const [formValues, setFormValues] = useState({ ...initData });
    const [selectedExercise, setSelected] = useState(initData.selectedExercise);;
    const [showClientError, setClientFailedAlert] = useState(false);
    const [showServerError, setServerFailedAlert] = useState(false);
    const [showSuccess, setSuccessAlert] = useState(false);
    const { user } = useAuth();

    const handleFormUpdate = (target, val) => {
        if (target === 'selectedExercise') {
            handleSelectedExercise(val);
        }
        setFormValues({ ...formValues, [target]: val });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnAvailability(false);
        isEditing ? patchSet() : postSet();
    }

    const onResetForm = () => {
        setFormValues({ ...initData })
    }

    const patchSet = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/${formValues._id}/patch_set`,
                { method: 'PUT', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
            const { message, status } = await response.json();
            if (status >= 300) {
                setClientFailedAlert(true);
                setTimeout(() => setClientFailedAlert(false), 7000);
            } else {
                setSuccessAlert(true);
                setTimeout(() => setSuccessAlert(false), 7000);
                updateSets();
            }
        } catch (error) {
            console.error(error)
            setServerFailedAlert(true)
            setTimeout(() => setServerFailedAlert(false), 7000);
        }
        setBtnAvailability(true);
    }

    const postSet = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/create_set`,
                { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
            const data = await response.json();
            if (data) {
                setSuccessAlert(true);
                setTimeout(() => setSuccessAlert(false), 7000);
                updateSets();
            } else {
                setClientFailedAlert(true);
                setTimeout(() => setClientFailedAlert(false), 7000);
            }
        } catch (err) {
            console.error(err);
            setServerFailedAlert(true);
            setTimeout(() => setServerFailedAlert(false), 7000);
        }
        setBtnAvailability(true);
    }

    async function handleSelectedExercise(val) {
        const exercise = exercises.find(exercise => exercise.name === val.split(':')[0]);
        setSelected(exercise);
    }

    const optionsList = exercises.map((o, idx) => {
        return <option key={`option-${o}${idx}`} value={o.name + ":" + o._id}>{capitalizeStr(o.name)}</option>
    })

    useEffect(() => {
        if (isEditing) {
            handleFormUpdate('selectedExercise', initData.selectedExercise);
        }
    }, []);
    
    return (
        <>
            <form className="wr-form " method="POST" onSubmit={handleSubmit}>
                <h2 className="wr-title">{title}</h2>
                <Input
                    label="Date"
                    inputType="date"
                    inputVal={formValues.date_and_time ? formatUSDateToIsoString(formValues.date_and_time) : ''}
                    targetVal="date_and_time"
                    validations={{ required: true }}
                    updateForm={handleFormUpdate}><span className="requiredMark">*</span></Input>
                <Select
                    label="Select an exercise"
                    updateForm={handleFormUpdate}
                    selectedVal={formValues['selectedExercise'] || 'Select Exercise'}
                    nameForId="selectedExercise"
                    validations={{ required: true }}
                    options={optionsList}><span className="requiredMark">*</span></Select>

                <Input
                    label="Weight in lbs"
                    inputType="number"
                    inputVal={formValues.set_weight}
                    targetVal="set_weight"
                    validations={{ required: true }}
                    updateForm={handleFormUpdate}><span className="requiredMark">*</span></Input>
                {selectedExercise && selectedExercise.balance === 'asymmetrical' ?
                    <>
                        <Input
                            label="Left Reps"
                            inputType="number"
                            inputVal={formValues.left_reps}
                            targetVal="left_reps"
                            validations={{ required: true }}
                            updateForm={handleFormUpdate}><span className="requiredMark">*</span></Input>
                        <Input
                            label="Right Reps"
                            inputType="number"
                            inputVal={formValues.right_reps}
                            targetVal="right_reps"
                            validations={{ required: true }}
                            updateForm={handleFormUpdate}><span className="requiredMark">*</span></Input>
                    </> :
                    <Input
                        label="Total Reps"
                        inputType="number"
                        inputVal={formValues.total_reps}
                        targetVal="total_reps"
                        validations={{ required: true }}
                        updateForm={handleFormUpdate}><span className="requiredMark">*</span></Input>
                }
                <div className="action-container">
                    <Button
                        isDisabled={!isBtnReady}
                        handleClick={onResetForm}
                        styleName="action-container__btn--secondary"
                        type="reset">RESET</Button>
                    <Button
                        isDisabled={!isBtnReady}
                        styleName="action-container__btn--primary"
                        inputType="save">SAVE</Button>
                </div>
            </form>
            { showSuccess ? <Alert handleClick={() => setSuccessAlert(false)} alertType="__success" message={`Successfully ${isEditing ? 'updated' : 'logged'} set!`} /> : null}
            { showClientError ? <Alert handleClick={() => setClientFailedAlert(false)} alertType="__fail" message={`${isEditing ? 'Edit' : 'Add'} set request unexpectedly failed. Please try again.`} /> : null}
            { showServerError ? <Alert handleClick={() => setServerFailedAlert(false)} alertType="__fail" message={`${isEditing ? 'Edit' : 'Add'} set request failed. Servers are down. Please try again later.`} /> : null}
        </>
    );
}


export default SetForm;