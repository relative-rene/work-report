import Main from './Main';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from '../components/Login';
import Modal from '../components/UI/Modal';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import SignUp from '../components/SignUp';
import { useAuth } from '../hooks/useAuth';
import { getExerciseData } from '../services/exercise.service';
import { getSetData } from '../services/set.service';

function Layout() {
    const navigate = useNavigate();
    const { user, reloadUser } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [allSets, updateSets] = useState([]);
    const [isSignupVisible, setSignupVisibility] = useState(false);
    const [isLoginVisible, setLoginVisibility] = useState(false);

    useEffect(() => {
        getExerciseData().then(res=>setExercises(res)).catch(err => console.error(err));
        reloadUser().then(user => {
            setLoginVisibility(false);
            navigate('/work-report/hub/getting-started');
            getSetData(user._id).then(updateSets).catch(err => console.error(err));
        });
    }, []);

    const handleLogin = (hasAnAccount) => {
        hasAnAccount ? setLoginVisibility(true) : setSignupVisibility(true);
    }

    const handleCancel = ()=>{
        console.log('triggered')
        setLoginVisibility(false);
    }

    return (
        <div className="Layout">
            <Navbar handleLogin={handleLogin} />
            <main className="MainContainer">
                <Sidebar />
                <Main>
                    <Outlet context={{ exercises, allSets }} />
                </Main>
            </main>
            <Footer />
            <Modal show={isLoginVisible} closeModal={() => setLoginVisibility(false)}>
                <Login 
                    onCancel={handleCancel} 
                    onSend={() => setLoginVisibility(false)} />
            </Modal>
            <Modal show={isSignupVisible} closeModal={() => setSignupVisibility(false)}>
                <SignUp />
            </Modal>
        </div>
    )
}
export default Layout