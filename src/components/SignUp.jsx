import React, { useState } from 'react';
import Input from './UI/Input';
import Button from './UI/Button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ModalNavbar from './ModalNavbar';

const SignUp = ({ onCloseSignupModal }) => {
    const initialState = { first_name: '', last_name: '', date_of_birth: '', email: '', password: '' }
    const [formValues, setFormValues] = useState(initialState);
    const [isVisible, setVisibility] = useState(false);
    const [status, setStatus] = useState('typing');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus('isSending');
        const isSuccess = await register(formValues);
        if (isSuccess) {
            setStatus('typing');
            navigate('/sets');
        } else {
            setStatus('type');
        }
    }

    const handleCancel = () => {
        setFormValues({ ...initialState });
        onCloseSignupModal();
    }

    const handleFormUpdate = (target, val) => {
        setFormValues({ ...formValues, [target]: val });
    }

    return (
        <form className="FormWR" onSubmit={handleSave}>
            <ModalNavbar closeModal={onCloseSignupModal} />
            <h2 className="form-title">Sign Up</h2>
            <Input 
                label="First Name" 
                inputVal={formValues.first_name} 
                updateForm={handleFormUpdate} 
                targetVal="first_name" />
            <Input 
                label="Last Name" 
                inputVal={formValues.last_name} 
                updateForm={handleFormUpdate} 
                targetVal="last_name" />
            <Input 
                label="Date of Birth" 
                inputVal={formValues.date_of_birth} 
                updateForm={handleFormUpdate} 
                targetVal="date_of_birth" 
                inputType="Date" />
            <Input 
                label="Email" 
                inputVal={formValues.email} 
                updateForm={handleFormUpdate} 
                targetVal="email" 
                inputType="email" />
            <Input 
                label="Password" 
                inputVal={formValues.password} 
                updateForm={handleFormUpdate} 
                autoComplete="new-password" 
                targetVal="password" 
                inputType={isVisible ? "text" : "password"}>
                <i 
                    onClick={(e) => setVisibility(!isVisible)} 
                    className={isVisible ? "fa solid fa-eye" : "fa solid fa-eye-slash"}></i>
            </Input>
            <div className="action-container">
                <Button 
                    handleClick={handleCancel} 
                    isDisabled={status === 'isSending'} 
                    styleName="action-container__btn--secondary">Cancel</Button>
                <Button 
                    handleClick={handleSave} 
                    isDisabled={status === 'isSending'} 
                    styleName="action-container__btn--primary" 
                    typeInput="save">Save</Button>
            </div>
        </form>
    )
}

export default SignUp;