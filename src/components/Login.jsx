import React, { useState, } from 'react';
import Button from './UI/Button';
import Input from './UI/Input';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onSend, onCancel }) => {
    const [isPasswordVisible, setPasswordVisability] = useState(false);
    const [formValues, setFormValues] = useState({ email: null, password: null });
    const [isReady, setAvailability] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setAvailability(false);
        const response = await login(formValues);
        if (response.message) {
            setAvailability(true);
            alert("Login Failed", response.message);
        } else {
            setAvailability(true);
            navigate('/work-report/hub/reports');
        }
    }

    const toggleView = () => {
        setPasswordVisability(!isPasswordVisible);
    }

    const onUpdateFormValue = (target, value) => {
        setFormValues({ ...formValues, [target]: value });
    }

    return (
        <form onSubmit={onSubmit}>
            <nav>
                <Link className="browser-back" to={() => navigate(-1)}>Back</Link>
                <i onClick={onCancel} className="fa-solid fa-bug" />
            </nav>
            <h1 className="form-title">Login</h1>
            <Input
                updateForm={onUpdateFormValue}
                targetVal="email"
                label="Email"
                inputType="email"
                validations={{ required: true, minLength: 3, maxLength: 20 }} />
            <Input
                updateForm={onUpdateFormValue}
                targetVal="password"
                label="Password"
                inputType={isPasswordVisible ? "text" : "password"}
                validations={{ required: true, minLength: 3, maxLength: 20 }}
            >
                <i onClick={toggleView} className={isPasswordVisible ? "fa solid fa-eye" : "fa solid fa-eye-slash"}></i>
            </Input>
            <div>
                <Link className="create-account" to="/sign-up">Create Account</Link>
            </div>

            <div className="action-container">
                <Button styleName="action-container__btn--secondary" handleClick={onCancel}>Cancel</Button>
                <Button isDisabled={!isReady} styleName="action-container__btn--primary" inputType="save">Login</Button>
            </div>
        </form>
    );
}



export default Login;