import Main from './Main';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from '../components/Login';
import Modal from '../components/UI/Modal';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import SignUp from '../components/SignUp';

function Layout() {
    const [isSignupVisible, setSignupVisibility] = useState(false);
    const [isLoginVisible, setLoginVisibility] = useState(false);

    const onHandleLogin = (hasAnAccount)=>{
        hasAnAccount? setLoginVisibility(true):setSignupVisibility(true);
    }
    return (
        <div className="Layout">
            <Navbar handleLogin={onHandleLogin}/>
            <main className="MainContainer">
                <Sidebar />
                <Main>
                    <Outlet />
                </Main>
            </main>
            <Footer />
            <Modal show={isLoginVisible} closeModal={() => setLoginVisibility(false)}>
                <Login />
            </Modal>
            <Modal show={isSignupVisible} closeModal={() => setSignupVisibility(false)}>
                <SignUp />
            </Modal>
        </div>
    )
}
export default Layout