import { React } from "react";
import './ExitPopup.css';

function ExitPopup({ isOpen, isNotExit, isExit }) {


    return (
        <div className={`exit-popup ${isOpen && 'exit-popup_opened'}`}>
            <div className="exit-popup__content">
                <h1 className="exit-popup__title">Exit</h1>
                <p className="exit-popup__subtitle"> Are you sure you want to exit?</p>
                <div className="exit-popup__buttons">
                    <button id="exit-popup__no" className="exit-popup__button open__focus" tabIndex={0} onClick={isNotExit}>No</button>
                    <button id="exit-popup__yes" className="exit-popup__button" tabIndex={0} onClick={isExit}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default ExitPopup;