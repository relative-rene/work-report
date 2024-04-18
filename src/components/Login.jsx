import React, { useState, } from 'react';
import Button from './UI/Button';
import Input from './UI/Input';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


export const Login = ({ onSend, onCancel }) => {
    const [isVisible, setVisability] = useState(false);
    const [formValues, setFormValues] = useState({ email: null, password: null });
    const [isReady, setAvailability] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async () => {
        setAvailability(false);
        const response = await login(formValues);
        response.message ? alert("Login Failed", response.message) : navigate('/reports');
        setAvailability(true);
    }

    const toggleView = () => {
        setVisability(!isVisible);
    }
    const onUpdateFormValue = (target, value) => {
        setFormValues({ ...formValues, [target]: value });
    }
    return (
        <form>
            <h2 className="login-title">Login In</h2>
                <Input updateForm={onUpdateFormValue} targetVal="email" label="Email" inputType="email" />
                <Input updateForm={onUpdateFormValue} targetVal="password" label="Password" inputType={isVisible ? "text" : "password"}>
                    <i onClick={toggleView} className={isVisible ? "fa solid fa-eye" : "fa solid fa-eye-slash"}></i></Input>
                <div className="action-container">
                    <Button styleName="__btn--secondary" handleClick={onCancel}>Cancel</Button>
                    <Button isDisabled={!isReady} styleName="__btn--primary" handleClick={onSubmit}>Login</Button>
                </div>
        </form>
    );
}


export default Login;