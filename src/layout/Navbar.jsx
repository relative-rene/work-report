import React from "react";
import Button from "../components/UI/Button";
import { useAuth } from "../hooks/useAuth";
import vutruvianLogo from "../assets/images/vutruvianLogo.jpeg";
import { useNavigate } from "react-router-dom";

const quickLinksMenu = [
    { pageTitle: "Sets", path: "/hub/sets" },
    { pageTitle: "Stats", path: "/hub/stats" },
    { pageTitle: "Exercises", path: "/hub/exercises" },
    { pageTitle: "Reports", path: "/hub/reports" },
];

const Navbar = ({ handleLogin }) => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const readyToGo = (path) => {
        if (user) {
            navigate(path)
        } else {
            handleLogin(true)
        }
    }

    const onHandleLogout = () => {
        logout();
        navigate('/hub/getting-started');
    }
    const options = quickLinksMenu.map((vm, idx) => <li className="nav-routes" key={"menu-" + idx} onClick={() => readyToGo(vm.path)}>{vm.pageTitle}</li>);
    return (
        <>
            <header className="Navbar">
                <div className="Logo" onClick={() => navigate('/hub/getting-started')}>
                    <img src={vutruvianLogo} alt="vutruvian logo" />
                </div>
                {user?._id ?
                    <div className="logout-container">
                        <i className="fa-solid fa-user-lock fa-xl" onClick={onHandleLogout} />
                    </div> :
                    <div>
                        <Button handleClick={() => handleLogin(false)} styleName="signUp-btn">Sign Up</Button>
                        <Button handleClick={() => handleLogin(true)} styleName="login-btn">Login</Button>
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