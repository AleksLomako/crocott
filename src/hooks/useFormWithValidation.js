import { useState, useCallback } from "react";

function useFormWithValidation() {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    // Изменение состояния инпутов, ошибок и проверка валидности
    const handleChangeInputs = (event) => {
        const target = event.target;
        const { name, value } = target;

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    // Сброс полей формы, ошибок
    const resetFormInputs = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, errors, isValid, setValues, setIsValid, handleChangeInputs, resetFormInputs };
}

export default useFormWithValidation;