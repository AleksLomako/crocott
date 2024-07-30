import React from "react";
import { useNavigate } from 'react-router-dom';
import AuthForm from "../AuthForm/AuthForm";
import FormInput from "../FormInput/FormInput";
import AuthFooter from "../AuthFooter/AuthFooter";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function SignInCode({isExitPopupOpen, onExit, onLoginCode, errorMessage }) {

    const navigate = useNavigate();
    const { values, errors, isValid, handleChangeInputs } = useFormWithValidation();
    const url = localStorage.getItem('url_CrocOtt');

    function handleSubmitCode(e) {
        e.preventDefault();
        onLoginCode(values);
    }

    function handleClickRoute() {
        navigate('/signinlogin')
    }

    return (
        <>
            <AuthForm
                title="Sign In"
                button="Next"
                link="Sign in with login"
                name="signInCode"
                onSubmit={handleSubmitCode}
                disabled={!isValid}
                className={`auth__submit-button ${!isValid && 'auth__submit-button_disabled'}`}
                errorMessage={errorMessage}
                onClick={handleClickRoute}
                onExit={onExit}
                isExitPopupOpen={isExitPopupOpen}
            >
                <FormInput
                    name="code"
                    type="text"
                    id="login-code"
                    placeholder="Code"
                    value={values.code || ''}
                    onChange={handleChangeInputs}
                    errorMessage={errors.code || ''}
                />
                <FormInput
                    name="url"
                    type="url"
                    id="login-url"
                    placeholder="Url"
                    value={url ? url : values.url ?? 'https://ott.crocott.com'}
                    onChange={handleChangeInputs}
                    errorMessage={errors.url || ''}
                />
            </AuthForm>
            <AuthFooter />
        </>
    );
}

export default SignInCode;