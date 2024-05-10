import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import ModalNavbar from '../../components/ModalNavbar';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';
import { capitalizeStr } from '../../utility/transformers';

const SetForm = ({ initData, title, isEditing }) => {
    const { exercises, updateSets } = useData();
    const [selectedExercise, setSelected] = useState(null);
    const [isBtnReady, setBtnAvailability] = useState(true);
    const [formValues, setFormValues] = useState({ ...initData, date: initData.date || initData.date_and_time || '' });
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
        updateSets()
    }

    const patchSet = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/patch_set`,
            { method: 'PUT', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        const { message } = response.json();
        message ? alert("Add Set Failed", message) : alert('PATCH Set Success')

    }

    const postSet = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/create_set`,
            { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        const { message } = response.json();
        message ? alert("Add Set Failed", message) : alert('POST Set Success')
    }

    async function handleSelectedExercise(val) {
        const exercise = exercises.find(exercise => exercise.name === val.split(':')[0]);
        setSelected(exercise);
    }

    const optionsList = exercises.map((o, idx) => {
        return <option key={`option-${o}${idx}`} value={o.name + ":" + o._id}>{capitalizeStr(o.name)}</option>
    })

    useEffect(() => {
       isEditing &&  handleSelectedExercise(initData.exercise_name + ":" + initData._id);
    },[]);

    return (
        <form className="FormWR" method="post" onSubmit={handleSubmit}>
            <ModalNavbar />
            <h2 className="form-title">{title}</h2>
            <Input inputType="date" inputVal={formValues.date || ''} label="Date" targetVal="date" updateForm={handleFormUpdate} />
            <Select
                updateForm={handleFormUpdate}
                selectedVal={formValues['selectedExercise'] || 'Select Exercise'}
                nameForId="selectedExercise"
                label="Select an exercise:"
                options={optionsList} />

            <Input inputType="number" inputVal={formValues.set_weight || ''} label="Weight in lbs" targetVal="set_weight" updateForm={handleFormUpdate} />
            { selectedExercise && selectedExercise.balance === 'asymmetrical' ?
                <>
                    <Input inputType="number" inputVal={formValues.left_reps || ''} label="Left Reps" targetVal="left_reps" updateForm={handleFormUpdate} />
                    <Input inputType="number" inputVal={formValues.right_reps || ''} label="Right Reps" targetVal="right_reps" updateForm={handleFormUpdate} />
                </>
                :
                <Input inputType="number" inputVal={formValues.total_reps || ''} label="Total Reps" targetVal="total_reps" updateForm={handleFormUpdate} />
            }
            <div className="action-container">
                <Button styleName="action-container__btn--secondary" type="reset">Reset</Button>
                <Button disabled={!isBtnReady} styleName="action-container__btn--primary" inputType="save">Save</Button>
            </div>
        </form>
    );
}


export default SetForm;