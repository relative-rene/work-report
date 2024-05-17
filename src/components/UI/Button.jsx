
const Button = ({ handleClick,styleName, inputType, isDisabled, children }) => {
    return (
        <button 
            disabled={isDisabled} 
            type={inputType|| "button"} 
            className={styleName} 
            onClick={handleClick}>{children}</button>
    )
}

export default Button;