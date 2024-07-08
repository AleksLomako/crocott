import { useEffect, useState, useCallback } from 'react';
import './AuthForm.css';


function AuthForm({ title, children, button, link, onSubmit, name, disabled, className, errorMessage, onClick }) {

    // NAVIGATION AUTH FORM
    const [focusElementsList, setFocusElementsList] = useState([]);
    const [elementIndex, setElementIndex] = useState(0);
    const [keyboardState, setKeyboardState] = useState(false);
    // HANDLE REMOTE CONTROL
    const handleKeyPress = useCallback((e) => {
        let index = elementIndex;
        if (e.keyCode === 40) {
            if (elementIndex !== focusElementsList.length - 1 && keyboardState !== true) {
                focusElementsList[index].classList.remove('active')
                index = elementIndex + 1;
                if (focusElementsList[index]) {
                    if (focusElementsList[index].className === 'auth__submit-button auth__submit-button_disabled') {
                        index = elementIndex + 2;
                        focusElementsList[index].classList.add('active')
                        setElementIndex(index)
                    }
                    else {
                        focusElementsList[index].classList.add('active')
                        setElementIndex(index)
                    }
                }
            }
            else if (focusElementsList[index].tagName === "BUTTON" || focusElementsList[index].tagName === "A") {
                if (elementIndex !== focusElementsList.length - 1) {
                    focusElementsList[index].classList.remove('active')
                    index = elementIndex + 1;
                    setElementIndex(index)
                    focusElementsList[index].classList.add('active')
                }
            }
        }
        else if (e.keyCode === 38) {
            if (elementIndex !== 0) {
                if (keyboardState !== true) {
                    // console.log(focusElementsList[index]);
                    focusElementsList[index].classList.remove('active')
                    index = elementIndex - 1;
                    if (focusElementsList[index]) {
                        if (focusElementsList[index].className === 'auth__submit-button auth__submit-button_disabled') {
                            index = elementIndex - 2;
                            focusElementsList[index].classList.add('active')
                            setElementIndex(index)
                        }
                        else {
                            focusElementsList[index].classList.add('active')
                            setElementIndex(index)
                        }
                    }

                }
                else if (focusElementsList[index].tagName === "BUTTON" || focusElementsList[index].tagName === "A") {
                    setKeyboardState(false)
                    focusElementsList[index].classList.remove('active')
                    index = elementIndex - 1;
                    focusElementsList[index].classList.add('active')
                    setElementIndex(index)
                }
            }


            else if (focusElementsList[index].tagName === "BUTTON" || focusElementsList[index].tagName === "A") {
                console.log(elementIndex);
                if (elementIndex !== 0) {
                    focusElementsList[index].classList.remove('active')
                    index = elementIndex - 1;
                    setElementIndex(index)

                    focusElementsList[index].classList.add('active')
                }
            }
        }
        else if (e.keyCode === 13) {
            if (focusElementsList[index].tagName === "INPUT") {
                focusElementsList[index].classList.add('active')
                if (keyboardState === false) {
                    setKeyboardState(true)
                    focusElementsList[index].focus();
                }
                else if (keyboardState === true) {
                    setKeyboardState(false)
                    focusElementsList[index].blur();
                }
                e.preventDefault();
            }
            else if (focusElementsList[index].tagName === "A") {
                focusElementsList[index].click()
            }


            else {
                focusElementsList[index].focus()
                setKeyboardState(false)
            }


        }
        else if (e.keyCode === 461) {
            if (focusElementsList[index].tagName === "INPUT") {
                focusElementsList[index].classList.add('active')
                if (keyboardState === true) {
                    setKeyboardState(false)
                    focusElementsList[index].blur();
                }
                e.preventDefault();
            }
        }

    }, [focusElementsList, elementIndex, keyboardState]);

    // HANDLE CLICK MOUSE
    const handleClickOutside = useCallback((e) => {
        setKeyboardState(false)
        focusElementsList.forEach((element) => {
            try {
                document.querySelector('.active').classList.remove('active')
            }
            catch { }
            if (document.activeElement === element) {
                setElementIndex(focusElementsList.indexOf(element))
                focusElementsList[elementIndex].classList.add('active')
                setKeyboardState(true)
            }
            else {
                focusElementsList[elementIndex].classList.remove('active')
            }
        })
    }, [focusElementsList]);


    useEffect(() => {
        // attach the e listeners
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('click', handleClickOutside);
        // remove the e listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleKeyPress, handleClickOutside]);

    useEffect(() => {
        const page = document.querySelector('.page');
        let elemList = [];
        page.childNodes.forEach((e) => {
            for (let i = 0; i in e.querySelectorAll("input, a, button"); i++) {
                elemList.push(e.querySelectorAll("input, a, button")[i])
            }
        });
        elemList[0].classList.add('active')
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