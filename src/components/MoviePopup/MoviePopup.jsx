import React from "react";
import './MoviePopup.css';
import BackBtn from '../../images/icons8-left-24.png';
import Lock from '../../images/icons8-lock-24.png';
import Star from '../../images/icons8-star-24.png';


function MoviePopup({ movie }) {

    // console.log(movie)

    return (
        <div className={`popup ${movie ? 'popup_opened' : ''}`}>
            <header className="popup__header">
                <div className="popup__back-btn">
                    <img className="popup__icon" src={BackBtn} alt="Back-arrow" />
                </div>
                {/* <h1 className="popup__title">{movie.movie.vod.display_name}</h1> */}
                <h1 className="popup__title">Batman</h1>
                <div className="popup__header-buttons">
                    <button className="popup__play-btn">
                        <p className="popup__play-text">Play</p>
                        <img className="popup__icon" src={Lock} alt="Lock" />
                    </button>
                    <button className="popup__play-btn popup__play-btn_trailer">Trailer</button>
                    <img className="popup__icon" src={Star} alt="Star" />
                </div>
            </header>
            <main className="popup__main"></main>
        </div>
    );
}

export default MoviePopup;