import { React } from "react";
import './ExitPopup.css';

function ExitPopup({ isOpen, isNotExit, isExit}) {

    return (
        <div className={`exit-popup ${isOpen && 'exit-popup_opened'}`}>
            <div className="exit-popup__content">
                <h1 className="exit-popup__title">Exit</h1>
                <p className="exit-popup__subtitle"> Are you sure you want to exit?</p>
                <div className="exit-popup__buttons">
                    <button className="exit-popup__button" onClick={isNotExit}>No</button>
                    <button className="exit-popup__button" onClick={isExit}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default ExitPopup;