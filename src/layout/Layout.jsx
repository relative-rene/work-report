import Main from './Main';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from '../components/Login';
import Modal from '../components/UI/Modal';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignUp from '../components/SignUp';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';

function Layout() {
    const { reloadUser } = useAuth();
    const { loadData } = useData();
    const [isSignupVisible, setSignupVisibility] = useState(false);
    const [isLoginVisible, setLoginVisibility] = useState(false);

    useEffect(() => {
        reloadUser()
            .then(user => loadData(user._id))
            .catch(err => console.error(err));
    }, [])

    const onLoginFlow = (hasAnAccount) => {
        return hasAnAccount ? setLoginVisibility(true) : setSignupVisibility(true);
    }

    return (
        <div className="Layout">
            <Navbar handleLogin={onLoginFlow} />
            <main className="MainContainer">
                <Sidebar />
                <Main>
                    <Outlet />
                </Main>
            </main>
            <Footer />
            <Modal show={isLoginVisible} closeModal={() => setLoginVisibility(false)}>
                <Login
                    onOpenSignupModal={() => setSignupVisibility(true)}
                    onCloseLoginModal={() => setLoginVisibility(false)} />
            </Modal>
            <Modal show={isSignupVisible} closeModal={() => setSignupVisibility(false)}>
                <SignUp
                    onCloseLoginModal={() => setLoginVisibility(false)}
                    onOpenSignupModal={() => setSignupVisibility(true)}
                    onCloseSignupModal={() => setSignupVisibility(false)} />
            </Modal>
        </div>
    )
}

export default Layout