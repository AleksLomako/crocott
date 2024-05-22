import { React, useState} from "react";
import { useNavigate } from 'react-router-dom';
import AuthForm from "../AuthForm/AuthForm";
import FormInput from "../FormInput/FormInput";
import Eye from "../../images/icons8-eye-16.png";
import EyeOff from "../../images/icons8-invisible-16.png";
import AuthFooter from "../AuthFooter/AuthFooter";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function SignInLogin({ onLogin, errorMessage }) {

    const navigate = useNavigate();
    const { values, errors, isValid, handleChangeInputs} = useFormWithValidation();
    const [visible, setVisible] = useState(true);


    // Сохранение данных формы
    function handleSubmitLogin(e) {
        e.preventDefault();
        onLogin(values);
    }
    // Клик по ссылке на роут регистрации по коду
    function handleClickRoute() {
        navigate('/signincode')
    }

    return (
        <>
            <AuthForm
                title="Sign In"
                button="Next"
                link="Sign in with code"
                className={`auth__submit-button ${!isValid && 'auth__submit-button_disabled'}`}
                disabled={!isValid}
                name="signInLogin"
                onSubmit={handleSubmitLogin}
                errorMessage={errorMessage}
                onClick={handleClickRoute}
            >
                <FormInput
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Login"
                    value={values.name || ''}
                    onChange={handleChangeInputs}
                    errorMessage={errors.name || ''}
                />
                <FormInput
                    name="password"
                    value={values.password || ''}
                    type={visible ? "password" : "text"}
                    id="password"
                    placeholder="Password"
                    onChange={handleChangeInputs}
                    icon={visible ? Eye : EyeOff}
                    onClick={() => setVisible(!visible)}
                    errorMessage={errors.password || ''}
                />
                <FormInput
                    name="url"
                    type="url"
                    id="login-url"
                    placeholder="Url"
                    value={values.url ?? 'https://ott.crocott.com'} 
                    onChange={handleChangeInputs}
                    errorMessage={errors.url || ''}
                />
            </AuthForm>
            <AuthFooter />
        </>
    );
}

export default SignInLogin;