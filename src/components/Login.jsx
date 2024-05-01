import React, { useEffect, useState, } from 'react';
import Button from './UI/Button';
import Input from './UI/Input';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';


export const Login = ({ onSend, onCancel }) => {
    const [isPasswordVisible, setPasswordVisability] = useState(false);
    const [formValues, setFormValues] = useState({ email: null, password: null });
    const [isReady, setAvailability] = useState(true);
    const { login  } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async () => {
        setAvailability(false);
        const response = await login(formValues);
        if(response.message) return alert("Login Failed", response.message);
        setAvailability(true);
        navigate('/work-report/hub/reports');
    }

    const toggleView = () => {
        setPasswordVisability(!isPasswordVisible);
    }
    const onUpdateFormValue = (target, value) => {
        setFormValues({ ...formValues, [target]: value });
    }
    return (
        <form>
            <nav>
            <Link className="browser-back" to={() => navigate(-1)}>Back</Link>
            <i onClick={onCancel} className="fa-solid fa-bug" />
            </nav>
            <h1 className="form-title">Login</h1>
            <Input updateForm={onUpdateFormValue} targetVal="email" label="Email" inputType="email" />
            <Input updateForm={onUpdateFormValue} targetVal="password" label="Password" inputType={isPasswordVisible ? "text" : "password"}>
                <i onClick={toggleView} className={isPasswordVisible ? "fa solid fa-eye" : "fa solid fa-eye-slash"}></i></Input>

            {/* <span onClick={()=> console.log('create-account')} className="create-account" href="rareurl.com">Create Account</span> */}
            <Link className="create-account" to="/sign-up">Create Account</Link>

            <div className="action-container">
                <Button styleName="action-container__btn--secondary" handleClick={onCancel}>Cancel</Button>
                <Button isDisabled={!isReady} styleName="action-container__btn--primary" handleClick={onSubmit}>Login</Button>
            </div>
        </form>
    );
}


export default Login;