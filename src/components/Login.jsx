import React, { useState, } from 'react';
import Button from './UI/Button';
import Input from './UI/Input';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';


export const Login = ({ onSend, onCancel }) => {
    const [isVisible, setVisability] = useState(false);
    const [formValues, setFormValues] = useState({ email: null, password: null });
    const [isReady, setAvailability] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async () => {
        setAvailability(false);
        const response = await login(formValues);
        response.message ? alert("Login Failed", response.message) : navigate('/work-report/hub/reports');
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
            <Link className="browser-back" to={()=>navigate(-1)}>Back</Link>
            <h1>Login</h1>
                <Input updateForm={onUpdateFormValue} targetVal="email" label="Email" inputType="email" />
                <Input updateForm={onUpdateFormValue} targetVal="password" label="Password" inputType={isVisible ? "text" : "password"}>
                    <i onClick={toggleView} className={isVisible ? "fa solid fa-eye" : "fa solid fa-eye-slash"}></i></Input>

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