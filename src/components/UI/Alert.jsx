import React from 'react';

const Alert = ({ alertType, message, handleClick }) => {

    return (
        <div onClick={handleClick} className={`alert ${alertType}`}>
            {message}
        </div >
    );
}

export default Alert;