import { React, useEffect, useCallback } from "react";
import './ExitPopup.css';

function ExitPopup({ isOpen, isNotExit, isExit }) {

    // useEffect(() => {
    //     if (isOpen === true) {
    //         document.getElementById('exit-popup__no').focus();
    //     }
    // }, [isOpen])

    // const handleKeyPressExitPopup = useCallback((e) => {
    //     if (e.keyCode === 461 || e.keyCode === 8) {
    //         isNotExit();
    //     }
    //     else if (e.keyCode === 13) {
    //         document.activeElement.click();
    //     }
    //     else if (e.keyCode === 39) {
    //         document.getElementById('exit-popup__yes').focus();
    //     }
    //     else if (e.keyCode === 37) {
    //         document.getElementById('exit-popup__no').focus();
    //     }
    // })

    // // ADD & REMOVE LISTENER
    // useEffect(() => {
    //     document.addEventListener('keydown', handleKeyPressExitPopup);
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyPressExitPopup);
    //     };
    // }, [handleKeyPressExitPopup]);


    return (
        <div className={`exit-popup ${isOpen && 'exit-popup_opened'}`}>
            <div className="exit-popup__content">
                <h1 className="exit-popup__title">Exit</h1>
                <p className="exit-popup__subtitle"> Are you sure you want to exit?</p>
                <div className="exit-popup__buttons">
                    <button id="exit-popup__no" className="exit-popup__button" tabIndex={0} onClick={isNotExit}>No</button>
                    <button id="exit-popup__yes" className="exit-popup__button" tabIndex={0} onClick={isExit}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default ExitPopup;