import { useEffect, useState, useCallback } from 'react';
import './AuthForm.css';

function AuthForm({ title, children, button, link, onSubmit, name, disabled, className, errorMessage, onClick }) {

    // NAVIGATION AUTH FORM
    const [focusElementsList, setFocusElementsList] = useState([]);
    const [elementIndex, setElementIndex] = useState(0);
    const handleKeyPress = useCallback((e) => {
        let index = elementIndex;
        if (document.activeElement.className !== "body") {
            if (e.code === "ArrowDown") {
                index = elementIndex + 1;
                if (focusElementsList[index]) {
                    focusElementsList[index].focus();
                    setElementIndex(index)
                }
            }
            else if (e.code === "ArrowUp") {
                if (elementIndex !== 0) {
                    index = elementIndex - 1;
                    focusElementsList[index].focus();
                    setElementIndex(index)
                }
            }
            else if (e.keyCode === 13) {
                index = elementIndex + 1;
                if (focusElementsList[index] && focusElementsList[index].tagName !== "A") {
                    focusElementsList[index].focus();
                    setElementIndex(index)
                }
            //     else {
            //         focusElementsList[index].onClick()
            //     }

            }
        }
        else {
            focusElementsList[0].focus();
            setElementIndex(0)
        }
    }, [focusElementsList, elementIndex]);


    const handleClickOutside = useCallback((e) => {
        focusElementsList.forEach((element) => {
            if (document.activeElement === element) {
                setElementIndex(focusElementsList.indexOf(element))
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
            document.addEventListener('click', handleClickOutside);
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
        elemList[0].focus();
        setFocusElementsList(elemList)
    }, [])
    /////////////////////////////////////////////////////////////////////////////


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