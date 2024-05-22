import { useRef } from 'react';

const Alert = ({ alertType, message, handleClick }) => {
    const elementRef = useRef();

    return (
        <div onClick={handleClick} ref={elementRef} className={`alert ${alertType}`}>
            {message}
        </div >
    );
}

export default Alert;