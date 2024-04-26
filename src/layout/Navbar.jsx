import React from 'react';
import Button from '../components/UI/Button';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import vutruvianLogo from '../assets/vutruvianLogo.jpeg';
const quickLinksMenu = [
    { pageTitle: 'Sets', path: "/work-report/hub/sets" },
    { pageTitle: 'Stats', path: "/work-report/hub/stats" },
    { pageTitle: 'Exercises', path: "/work-report/hub/exercises" },
    { pageTitle: 'Reports', path: "/work-report/hub/reports" },
];

const Navbar = ({handleLogin}) => {
    const { user, logout } = useAuth();
    const options = quickLinksMenu.map((vm, idx) => <li key={"menu-" + idx}><Link to={vm.path + "/" + user._id}>{vm.pageTitle}</Link></li>);
    return (
        <>
            <header className="Navbar">
                <div className="Logo">
                    <img src={vutruvianLogo} alt="vutruvian logo" />
                </div>
                {user?._id ?
                    <div className="logout-container">
                        <i className="fa-solid fa-user-lock fa-xl" onClick={logout} />
                    </div> :
                    <div>
                        <Button handleClick={() => handleLogin(false)} styleName="signUp-btn">Sign Up</Button>
                        <Button handleClick={()=>handleLogin(true)} styleName="login-btn">Login</Button>
                    </div>
                }

            </header>
            <ul className="NavbarMenu">
                {options}
            </ul>
        </>
    )
}

export default Navbar;