import React from "react";
import './MoviePopup.css';
import BackBtn from '../../images/icons8-left-24.png';
import Lock from '../../images/icons8-lock-24.png';
import Star from '../../images/icons8-star-24.png';
import timeConvertor from "../../utils/timeConvertor";


function MoviePopup({ movie, onClose }) {

    // console.log(movie?.movie)

    return (
        <div className={`popup ${movie ? 'popup_opened' : ''}`}>
            <header className="popup__header">
                <div className="popup__back-btn"
                    onClick={onClose}>
                    <img className="popup__icon" src={BackBtn} alt="Back-arrow" />
                </div>
                <h1 className="popup__title">{movie?.movie.vod.display_name}</h1>
                <div className="popup__header-buttons">
                    <button className="popup__play-btn">
                        <p className="popup__play-text">Play</p>
                        <img className="popup__icon" src={Lock} alt="Lock" />
                    </button>
                    <button className="popup__play-btn popup__play-btn_trailer">Trailer</button>
                    <img className="popup__icon" src={Star} alt="Star" />
                </div>
            </header>
            <main className="popup__main"
                style={{ backgroundImage: `url(${movie?.movie.vod.background_url})` }}>
                <ul className="popup__info">
                    <li className="popup__info-item popup__info-item_rating">
                        <h2 className="popup__info-title popup__info-title_rating">Rating</h2>
                        <p className="popup__info-subtitle popup__info-subtitle_rating">{movie?.movie.vod.user_score}</p>
                    </li>
                    <li className="popup__info-item">
                        <h2 className="popup__info-title">Country</h2>
                        <p className="popup__info-subtitle">{movie?.movie.vod.country}</p>
                    </li>
                    <li className="popup__info-item">
                        <h2 className="popup__info-title">Duration</h2>
                        <p className="popup__info-subtitle">{timeConvertor(movie?.movie.vod.duration)}</p>
                    </li>
                    <li className="popup__info-item">
                        <h2 className="popup__info-title">Prime date</h2>
                        <p className="popup__info-subtitle">{movie?.movie.vod.prime_date}</p>
                    </li>
                    <li className="popup__info-item">
                        <h2 className="popup__info-title">Views</h2>
                        <p className="popup__info-subtitle">{movie?.movie.view_count}</p>
                    </li>
                </ul>
                <div className="popup__description">
                    <img className="popup__image" src={movie?.movie.vod.preview_icon} alt="Movie Icon" />
                    <p className="popup__text">{movie?.movie.vod.description}</p>
                </div>
            </main>
        </div>
    );
}

export default MoviePopup;