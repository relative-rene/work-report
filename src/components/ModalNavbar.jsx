

function ModalNavbar({closeModal}) {
    return (<div className="modal-navbar">
        <i onClick={closeModal} className="fa-solid fa-x" />
    </div>)
}


export default ModalNavbar;