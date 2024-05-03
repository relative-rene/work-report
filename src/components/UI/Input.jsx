import React, { useRef, useState } from 'react'

const Input = ({ updateForm, label, targetVal, inputVal, inputType, validations, children }) => {
    const inputRef = useRef();
    const [hasErrors, setErrors] = useState(false)
    function isValid() {
        inputRef.current.value.length === 0 ||
        inputRef.current && 
        inputRef.current.validity && 
        inputRef.current.validity.valid ? 
        setErrors(false) : 
        setErrors(true);
    }

    return (
        <div className="InputComponent">
            {console.log(validations)}
            <label>{label}  {children}
                <input
                    minLength={validations? validations.minLength : 0}
                    maxLength={validations? validations.maxLength : -1}
                    required={validations? validations.required : false}
                    className={hasErrors && "--invalid"}
                    ref={inputRef}
                    value={inputVal}
                    onBlur={isValid}
                    onChange={(e => updateForm(targetVal, e.target.value))}
                    type={inputType || "text"} />
            </label>
            {   hasErrors &&
                <p className="error-message">{inputRef.current.validationMessage}</p>
            }
        </div>
    )
}

export default Input;
