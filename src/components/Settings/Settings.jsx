import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import './Settings.css';


function Settings({ isExitPopupOpen }) {
    const header = document.querySelector('.header__link_active');
    const navigate = useNavigate();
    const [elementNav, setElementNav] = useState('');
    // POPUP EXIT
    const [exitPopupElement, setExitPopupElement] = useState('exit-popup__no');
    // HANDLE REMOTE CONTROL
    const handleKeyPress = useCallback((e) => {
        e.preventDefault();
        // INDEXES
        let exitPopupElem = exitPopupElement;
        // EXIT POPUP CLOSE
        if (isExitPopupOpen !== true) {
            //  HEADER NAV
            if (elementNav === ".header") {
                if (e.keyCode === 39) {
                    document.activeElement.blur();
                    document.querySelector('.header__icon_exit').click()
                }
                else if (e.keyCode === 37) {
                    document.activeElement.blur();
                    navigate('/packages')
                }
                else if (e.keyCode === 40) {
                    // nav on main setting
                }
                else if (e.keyCode === 13) {
                    document.activeElement.click()
                }
                else if (e.keyCode === 461 || e.keyCode === 8) {
                    document.querySelector('.header__icon_exit').click()
                }
            }
        }
        // EXIT POPUP OPEN
        else {
            document.getElementById(exitPopupElem).focus()
            if (e.keyCode === 461 || e.keyCode === 8) {
                document.getElementById('exit-popup__no').click();
                document.getElementById('exit-popup__no').classList.add('open__focus');
                setExitPopupElement('exit-popup__no')
                if (elementNav === '.header') {
                    setElementNav('.header')
                }
            }
            else if (e.keyCode === 39 && exitPopupElem !== 'exit-popup__yes') {
                document.getElementById('exit-popup__yes').focus();
                setExitPopupElement('exit-popup__yes');
                document.getElementById('exit-popup__no').classList.remove('open__focus');
            }
            else if (e.keyCode === 37 && exitPopupElem !== 'exit-popup__no') {
                document.getElementById('exit-popup__no').focus();
                setExitPopupElement('exit-popup__no');
            }
            else if (e.keyCode === 13) {
                document.activeElement.click()
                if (elementNav === '.header') {
                    setElementNav('.header')
                }
                document.getElementById('exit-popup__no').classList.add('open__focus');
            }
        }

    }, [exitPopupElement, isExitPopupOpen, elementNav])

    // HANDLE CLICK MOUSE
    const handleClickOutside = useCallback((e) => { }, [])

    // ADD & REMOVE LISTENER
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleKeyPress, handleClickOutside]);

    // HEADER FOCUS and MOVIES GROUPS
    useEffect(() => {
        // console.log(isExitPopupOpen);
        header.focus();
        setElementNav('.header')
    }, [header]);


    return (
        <section className="settings">
            <h1>SETTINGS</h1>
        </section>
    );
}

export default Settings;