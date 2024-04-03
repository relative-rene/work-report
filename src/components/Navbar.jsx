import React from 'react';
import Button from './UI/Button';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const quickLinksMenu = [
    { pageTitle: 'Sets', path: "sets" },
    { pageTitle: 'Stats', path: "stats" },
    { pageTitle: 'Exercises', path: "exercises" },
    { pageTitle: 'Programs', path: "routines" },
    { pageTitle: 'Meals', path: "mealplanner" },
    { pageTitle: 'Recovery', path: "recovery" }
];

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const options = quickLinksMenu.map((vm, idx) => <li key={"menu-" + idx}><Link to={vm.path}>{vm.pageTitle}</Link></li>);
    return (
        <>
            <header className="Navbar">
                <div className="Logo">
                    <img src="assets/vutruvianLogo.jpeg" alt="vutruvian logo" />
                </div>
                {user?._id ?
                    <div className="logout-container">
                        <i className="fa-solid fa-user-lock fa-xl" onClick={logout} />
                    </div> :
                    <div>
                        <Button handleClick={() => navigate('/register')} styleName="signUp">Sign Up</Button>
                        <Button handleClick={() => navigate('/login')} styleName="login">Login</Button>
                    </div>
                }

            </header>
            <ul className="Menu">
                {options}
            </ul>
        </>
    )
}

export default Navbar;