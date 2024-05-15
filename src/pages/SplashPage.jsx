import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vutruvianLogo from '../assets/vutruvianLogo.jpeg';
import Modal from '../components/UI/Modal';
import Login from '../components/Login';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useData } from '../hooks/useData';


const SplashPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setVisibility] = useState(false);
    const { exercises, sets, stats } = useData();
    const [isLoading, setLoading] = useState(false);

    return (
        <>
            <div className="text">
                <p className="project-name">Work Report</p>
                <span>by</span>
                <p className="credit">Rene Arellano</p>
                <button onClick={() => setVisibility(true)}>Welcome Back</button>
                <button onClick={() => navigate('/hub/getting-started')}>Getting Started</button>
            </div>
            <div className="splash">
                <div className="splash_logo">
                    <img src={vutruvianLogo} alt="vutruvian logo" />
                </div>
                <div className="splash_svg">
                    <svg width="100%" height="100%">
                        <rect width="100%" height="100%" />
                    </svg>
                </div>
                <div className="splash_minimize">
                    <svg width="100%" height="100%">
                        <rect width="100%" height="100%" />
                    </svg>
                </div>
            </div>
            <Modal show={isModalOpen} closeModal={() => setVisibility(false)}>
                <Login onCloseLoginModal={() => setVisibility(false)} />
            </Modal>

        </>)
}

export default SplashPage;