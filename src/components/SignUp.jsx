import React, { useState } from 'react';
import Input from './UI/Input';
import Button from './UI/Button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const initialState = { first_name: '', last_name: '', date_of_birth: '', email: '', password: '' }
    const [formValues, setFormValues] = useState(initialState);
    const [isVisible, setVisibility] = useState(false);
    const [status, setStatus] = useState('typing');
    const { user, register } = useAuth();
    const navigate = useNavigate();

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus('isSending');
        const isSuccess = await register(formValues);
        console.log('isSuccess', isSuccess);
        if (isSuccess) {
            setStatus('typing');
            navigate('/sets');
        } else {
            setStatus('type');
        }
    }

    const handleCancel = () => {
        setFormValues({ ...initialState });
    }

    const handleFormUpdate = (target, val) => {
        setFormValues({ ...formValues, [target]: val });
    }



    return (
        <form>
            <h2>Sign Up</h2>
            <Input inputVal={formValues.first_name} updateForm={handleFormUpdate} targetVal="first_name" label="First Name" />
            <Input inputVal={formValues.last_name} updateForm={handleFormUpdate} targetVal="last_name" label="Last Name" />
            <Input inputVal={formValues.date_of_birth} updateForm={handleFormUpdate} targetVal="date_of_birth" label="Date of Birth" inputType="Date" />
            <Input inputVal={formValues.email} updateForm={handleFormUpdate} targetVal="email" label="Email" inputType="email" />
            <Input inputVal={formValues.password} updateForm={handleFormUpdate} targetVal="password" label="Password" inputType={isVisible ? "text" : "password"}>
                <i onClick={(e) => setVisibility(!isVisible)} className={isVisible ? "fa solid fa-eye" : "fa solid fa-eye-slash"}></i>
            </Input>
            <div className="action-container">
                <Button handleClick={handleCancel} isDisabled={status === 'isSending'} styleName="__btn--secondary">Cancel</Button>
                <Button handleClick={handleSave} isDisabled={status === 'isSending'} styleName="__btn--primary">Save</Button>
            </div>
        </form>
    )
}

export default SignUp;