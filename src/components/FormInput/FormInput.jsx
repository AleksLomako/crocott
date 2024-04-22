import { React } from "react";
import './FormInput.css';

function FormInput({ id, name, value, onChange, type, placeholder, minLength, maxLength, pattern, errorMessage, icon, onClick}) {

    return (
        <div className="form-input">
            <input className="form-input__input"
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                id={id}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                required 
                />
                {id === "password" ? <img src={icon} alt="Icon" className="form-input__icon" onClick={onClick}></img> : ''}
            <span className="form-input__error">{errorMessage}</span>
        </div>

    );
}

export default FormInput;