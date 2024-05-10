
import {useNavigate, Link } from 'react-router-dom';

function ModalNavbar({closeModal}) {
    const navigate = useNavigate();
    return (<div className="modal-navbar">
        <Link className="browser-back" to={() => navigate(-1) && closeModal}>Back</Link>
        <i onClick={closeModal} className="fa-solid fa-bug" />
    </div>)
}


export default ModalNavbar;