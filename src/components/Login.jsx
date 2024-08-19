import React, { useState, } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from './UI/Button';
import Input from './UI/Input';
import ModalNavbar from './ModalNavbar';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './UI/LoadingSpinner';

const Login = ({ onOpenSignupModal, onCloseLoginModal }) => {
    const [isPasswordVisible, setPasswordVisability] = useState(false);
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const [isReady, setAvailability] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setAvailability(false);
        setLoading(true)
        alert('Free servers are slow, like 50 seconds delays. To alleviate the problem, I have added caching but that will only take effect after the first long wait. Sorry again, this is a result of frugality and not programming skill or experience. Thanks for your understanding')
        const data = await login(formValues);
        if (!data) {
            setLoading(false);
            setAvailability(true);
            alert(`Login Failed`);
            return;
        } else {
            setLoading(false);
            setAvailability(true);
            navigate('/hub/reports');
            return onCloseLoginModal();
        }
    }

    const onFreeTrial = async (e) => {
        e.preventDefault();
        setAvailability(false);
        setLoading(true);
        alert('Free servers are slow, like 50 seconds delays. To alleviate the problem, I have added caching but that will only take effect after the first long wait. Sorry again, this is a result of frugality and not programming skill or experience. Thanks for your understanding')
        const data = await login({ email: "dd@hotmail.com", password: "realdeal" });
        if (!data) {
            setLoading(false);
            setAvailability(true);
            alert(`Login Failed`);
            return;
        } else {
            setLoading(false);
            setAvailability(true);
            navigate('/hub/reports');
            return onCloseLoginModal();
        }

    }

    const toggleView = () => {
        setPasswordVisability(!isPasswordVisible);
    }

    const onUpdateFormValue = (target, value) => {
        setFormValues({ ...formValues, [target]: value });

    }

    const onCreateAccount = () => {
        onCloseLoginModal();
        onOpenSignupModal();

    }

    return (
        <>
            <form className="modal-form" onSubmit={onSubmit}>
                <ModalNavbar closeModal={onCloseLoginModal} />
                <h1 className="wr-title">Login</h1>
                <Input
                    label="Email"
                    inputVal={formValues.email}
                    updateForm={onUpdateFormValue}
                    targetVal="email"
                    inputType="email"
                    autoComplete="email"
                    validations={{ required: true, minLength: 4, maxLength: 20 }} />
                <Input
                    label="Password"
                    inputVal={formValues.password}
                    targetVal="password"
                    updateForm={onUpdateFormValue}
                    autoComplete="current-password"

                    inputType={isPasswordVisible ? "text" : "password"}
                    validations={{ required: true, minLength: 5, maxLength: 20}}>
                    <i
                        onClick={toggleView}
                        className={isPasswordVisible ? "fa solid fa-eye" : "fa solid fa-eye-slash"}></i>
                </Input>
                <div>
                    <Link className="create-account" onClick={onCreateAccount}>Create Account</Link>
                </div>

                <div className="action-container">
                    <Button
                        isDisabled={!isReady}
                        styleName="action-container__btn--neon"
                        handleClick={onFreeTrial}>MOCK USER</Button>
                    <Button
                        styleName="action-container__btn--secondary"
                        handleClick={onCloseLoginModal}>CANCEL</Button>
                    <Button
                        isDisabled={!isReady}
                        styleName="action-container__btn--primary"
                        inputType="save">LOGIN</Button>
                </div>
            </form>
            {isLoading ? <LoadingSpinner hasBlur={true} /> : null}
        </>
    );
}

export default Login;