import { useEffect, useState, useCallback } from 'react';
import './AuthForm.css';

function AuthForm({ title, children, button, link, onSubmit, name, disabled, className, errorMessage, onClick }) {

    // NAVIGATION
    const [startFocus, setStartFocus] = useState(0);
    const [focusElementsList, setFocusElementsList] = useState([]);
    const [focusElement, setFocusElement] = useState('');
    const [elementIndex, setElementIndex] = useState(0);


    const handleKeyPress = useCallback((event) => {
        // console.log(`Key pressed: ${event.code}`);
        // console.log(elementIndex);
        let indexTest = elementIndex;
        if (event.code === "ArrowDown") {
            indexTest = elementIndex + 1;
            if (focusElementsList[indexTest]) {
                focusElementsList[indexTest].focus();
                setElementIndex(indexTest)
            }
        }
        else if (event.code === "ArrowUp") {
            if (elementIndex !== 0) {
                indexTest = elementIndex - 1;
                focusElementsList[indexTest].focus();
                setElementIndex(indexTest)
            }
        }

    }, [focusElementsList, elementIndex]);



    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);

        // remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);



    useEffect(() => {
        const page = document.querySelector('.page');
        let elemList = [];
        page.childNodes.forEach((e) => {
            for (let i = 0; i in e.querySelectorAll("input, a, button"); i++) {
                elemList.push(e.querySelectorAll("input, a, button")[i])
            }
        });

        // console.log(elemList);

        elemList[0].focus();
        setFocusElementsList(elemList)
    }, [])


    return (
        <main className="auth">
            <h1 className="auth__title">{title}</h1>
            <form className="auth__form"
                onSubmit={onSubmit}
                name={name}
                noValidate>
                <span className={`auth__error ${errorMessage ? 'auth__error_visible' : ''}`}>{errorMessage}</span>
                <div className="auth__inputs">
                    {children}
                </div>
                <button className={className} type="submit" disabled={disabled}>{button}</button>
            </form>
            <button className="auth__link" onClick={onClick}>{link}</button>
        </main >
    );
}

export default AuthForm;