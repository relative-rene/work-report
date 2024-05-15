import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';
import ModalNavbar from '../../components/ModalNavbar';
import { capitalizeStr, formatUSDateToIsoString } from '../../utility/transformers';

const SetForm = ({ initData, title, isEditing }) => {
    const { exercises, updateSets } = useData();
    const [isBtnReady, setBtnAvailability] = useState(true);
    const [formValues, setFormValues] = useState({ ...initData });
    const [selectedExercise, setSelected] = useState(initData.selectedExercise);;
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
        setBtnAvailability(true);

    }

    const patchSet = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/${formValues._id}/patch_set`,
            { method: 'PUT', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        const { message } = response.json();
        message ? alert(`Add Set Failed ${message}`) : alert('PATCH Set Success');
        updateSets();

    }

    const postSet = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/create_set`,
            { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        const { message } = response.json();
        message ? alert(`Add Set Failed ${message}`) : alert('POST Set Success');
        updateSets();
    }

    async function handleSelectedExercise(val) {
        const exercise = exercises.find(exercise => exercise.name === val.split(':')[0]);
        setSelected(exercise);
    }

    const optionsList = exercises.map((o, idx) => {
        return <option key={`option-${o}${idx}`} value={o.name + ":" + o._id}>{capitalizeStr(o.name)}</option>
    })

    return (
        <form className="FormWR" method="post" onSubmit={handleSubmit}>
            <ModalNavbar />
            <h2 className="form-title">{title}</h2>
            <Input
                label="Date"
                inputType="date"
                inputVal={formValues.date_and_time ? formatUSDateToIsoString(formValues.date_and_time) : ''}
                targetVal="date_and_time"
                updateForm={handleFormUpdate} />
            <Select
                label="Select an exercise:"
                updateForm={handleFormUpdate}
                selectedVal={formValues['selectedExercise'] || 'Select Exercise'}
                nameForId="selectedExercise"
                options={optionsList} />

            <Input
                label="Weight in lbs"
                inputType="number"
                inputVal={formValues.set_weight || 0}
                targetVal="set_weight"
                updateForm={handleFormUpdate} />
            { selectedExercise && selectedExercise.balance === 'asymmetrical' ?
                <>
                    <Input
                        label="Left Reps"
                        inputType="number"
                        inputVal={formValues.left_reps || 0}
                        targetVal="left_reps"
                        updateForm={handleFormUpdate} />
                    <Input
                        label="Right Reps"
                        inputType="number"
                        inputVal={formValues.right_reps || 0}
                        targetVal="right_reps"
                        updateForm={handleFormUpdate} />
                </> :
                <Input
                    label="Total Reps"
                    inputType="number"
                    inputVal={formValues.total_reps || 0}
                    targetVal="total_reps"
                    updateForm={handleFormUpdate} />
            }
            <div className="action-container">
                <Button
                    styleName="action-container__btn--secondary"
                    type="reset">Reset</Button>
                <Button
                    disabled={!isBtnReady}
                    styleName="action-container__btn--primary"
                    inputType="save">Save</Button>
            </div>
        </form>
    );
}


export default SetForm;