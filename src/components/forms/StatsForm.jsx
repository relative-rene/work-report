import React, { useState } from 'react';
import ToggleCheckbox from '../UI/ToggleCheckbox';
import InputHeight from '../UI/InputHeight';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Alert from '../../components/UI/Alert';

import GuessBodyFat from '../GuessBodyFat';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { formatUSDateToIsoString } from '../../utility/transformers';

function StatsForm({ initData, title, isEditing }) {
    const [standard, setStandard] = useState('Metric');
    const [isReady, setAvailability] = useState(true);
    const [showGuessModal, setGuessVisibility] = useState(false);
    const [showCompleteForm, setFormVisibility] = useState(false);
    const [showClientError, setClientFailedAlert] = useState(false);
    const [showServerError, setServerFailedAlert] = useState(false);
    const [showSuccess, setSuccessAlert] = useState(false);
    const [formValues, setFormValues] = useState({ ...initData, date: initData.date ? formatUSDateToIsoString(initData.date) : '' });
    const { user } = useAuth();
    const { updateStats } = useData();

    const handleFormUpdate = (target, val) => {
        setFormValues({ ...formValues, [target]: val });
    }

    const handleCancel = () => (setFormValues({ ...initData }));

    const handleSave = (e) => {
        e.preventDefault()
        setAvailability(false)
        isEditing ? patchStats() : postStats();
    }

    const postStats = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/create_stats`, { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
            const data = await response.json()
            if (data.message) {
                setClientFailedAlert(true);
                setTimeout(() => setClientFailedAlert(false), 7000);
            } else {
                setSuccessAlert(true);
                setTimeout(() => setSuccessAlert(false), 7000);
                updateStats();
            }
        } catch (err) {
            console.error(err);
            setServerFailedAlert(true)
            setTimeout(() => setServerFailedAlert(false), 7000);
        }
        setAvailability(true);
    }

    const patchStats = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/${formValues._id}/patch_stats`, { method: 'PUT', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
            const data = await response.json();
            if (data.message) {
                setClientFailedAlert(true);
                setTimeout(() => setClientFailedAlert(false), 7000);

            } else {
                setSuccessAlert(true);
                setTimeout(() => setSuccessAlert(false), 7000);

                updateStats();
            }
        } catch (err) {
            console.error(err);
            setServerFailedAlert(true)
            setTimeout(() => setServerFailedAlert(false), 7000);
        }
        setAvailability(true);
    }

    return (
        <>
            <form className="wr-form " onSubmit={handleSave}>
                <h2 className="wr-title">{title}</h2>
                <Input inputType="date" inputVal={formValues.date || ''} validations={{ required: true }} label="Date" targetVal="date" updateForm={handleFormUpdate}><span className="requiredMark">*</span></Input>
                <Input inputType="number" inputVal={formValues.age || ''} label="Age" targetVal="age" updateForm={handleFormUpdate} />
                <Input inputType="number" inputVal={formValues.weight || ''} validations={{ required: true }} label="Weight in lbs" targetVal="weight" updateForm={handleFormUpdate}><span className="requiredMark">*</span></Input>
                <ToggleCheckbox updateForm={(val) => setStandard(val)} label={standard} />
                <InputHeight standard={standard} updateForm={handleFormUpdate} />
                <Input inputType="number" inputVal={formValues.body_fat || ''} label="Body Fat %" targetVal="body_fat" updateForm={handleFormUpdate}><span onClick={() => setGuessVisibility(true)} className="moreOrLess">Guess BF%</span></Input>
                <span className="moreOrLess" onClick={() => setFormVisibility(!showCompleteForm)}>{showCompleteForm ? 'Less' : 'More'}</span>
                {showCompleteForm ?
                    <>
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
                    </> : null}
                <div className="action-container">
                    <Button isDisabled={!isReady} handleClick={handleCancel} styleName="action-container__btn--secondary">CANCEL</Button>
                    <Button isDisabled={!isReady} styleName="action-container__btn--primary" inputType="save">SAVE</Button>
                </div>
            </form>
            { showSuccess ? <Alert handleClick={() => setSuccessAlert(false)} alertType="__success" message={`Successfully ${isEditing ? "updated" : "logged"} stats!`} /> : null}
            { showClientError ? <Alert handleClick={() => setClientFailedAlert(false)} alertType="__fail" message={`${isEditing ? 'Edit' : 'Add'} stats request unexpectedly failed. Please try again.`} /> : null}
            { showServerError ? <Alert handleClick={() => setServerFailedAlert(false)} alertType="__fail" message={`${isEditing ? 'Edit' : 'Add'} stats request failed. Servers are down. Please try again later.`} /> : null}
            <Modal show={showGuessModal} closeModal={() => setGuessVisibility(false)}>
                <GuessBodyFat onCloseGuessModal={() => setGuessVisibility(false)} />
            </Modal>
        </>
    );

}

export default StatsForm;