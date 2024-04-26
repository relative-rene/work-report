import Backdrop from './Backdrop';

const Modal = (props) => {
    return (
        <>
        <Backdrop show={props.show} clicked={props.closeModal} />
            <div className={props.show?'Modal --open':'Modal --closed'}>
                {props.children}
            </div>
            </>
        );
}

export default Modal;