import { React, useState } from "react";
import './MoviePopup.css';
import BackBtn from '../../images/icons8-left-24.png';
import Play from '../../images/icons8-play-30.png';
import Star from '../../images/icons8-star-24.png';
import timeConvertor from "../../utils/timeConvertor";
import dateConvertor from "../../utils/dateConvertor";
import Player from "../Player/Player";
import mainApi from "../../utils/MainApi";


function MoviePopup({ movie, onClose }) {

    const [loading, setLoading] = useState(false);
    const [videoData, setVideoData] = useState({});
    // raiting score
    let progress = movie?.movie.vod.user_score;
    let dashArray = (2 * 3.14 * 70);
    let dashOffset = dashArray * ((10 - progress) / 10);

    // TESTING CODE
    // change favorite flag
    function changeFavorite() {
        let vodId = movie.movie.id;
        console.log(movie.movie.favorite);
        if (movie.movie.favorite === false) {
            let favorite = { "favorite": true };
            mainApi.changeFavoriteVod(vodId, favorite)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);;
                })
        }
        else {
            let favorite = { "favorite": false }
            mainApi.changeFavoriteVod(vodId, favorite)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);;
                })
        }
    }


    // console.log(movie)
    function playVod() {
        console.log("PLAY VOD");
        // console.log(movie.movie.vod.urls[0].url);
        console.log(movie.movie);
        // startPlayer('test', 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8')
        // startPlayer('test', movie.movie.vod.trailer_url)
        startPlayer(movie.movie.vod.display_name, movie.movie.vod.urls[0].url)
    }


    function playVodTreiler() {
        startPlayer(movie.movie.vod.display_name, movie.movie.vod.trailer_url)
    }


    function startPlayer(display_name, urls) {
        setLoading(true)
        setVideoData({
            "videoUrl": urls,
            "videoName": display_name,
            "width": window.innerWidth + 'px',
            "height": window.innerHeight + 'px'
        })
        // document.getElementById('video').style.position = 'fixed'
        // test()
    }


    // function test() {
    //     if (document.getElementById('video')) {
    //         document.getElementById('video').style.position = 'fixed'
    //     }
        // const video = document.getElementById('videoStream_html5_api');
        // const video = document.getElementById('videoStream');



        // console.log(video.currentTime);

        // skip
        // video.currentTime += 10
        // continue watching
        // video.currentTime = 100

        // test fun player
        // video.play()
        // video.pause()
        // video.width =500;
    // }




    return (
        <div className={`popup ${movie ? 'popup_opened' : ''}`}>
            <header className="popup__header">
                <div className="popup__back-btn"
                    onClick={onClose}>
                    <img className="popup__icon arrow" src={BackBtn} alt="Back-arrow" tabIndex={0} />
                </div>
                <h1 className="popup__title">{movie?.movie.vod.display_name}</h1>
                <div className="popup__header-buttons">
                    <button className="popup__play-btn" tabIndex={0} onClick={playVod}>
                        <p className="popup__play-text">Play</p>
                        <img className="popup__icon" src={Play} alt="Lock" />
                    </button>
                    <button className="popup__play-btn popup__play-btn_trailer" tabIndex={0} onClick={playVodTreiler}>Trailer</button>
                    <img className="popup__icon star" src={Star} alt="Star" tabIndex={0} onClick={changeFavorite} />
                </div>
            </header>
            <main className="popup__main"
                style={{ backgroundImage: `url(${movie?.movie.vod.background_url})` }}>
                <ul className="popup__info">
                    <li className="popup__info-item popup__info-item_rating">
                        <h2 className="popup__info-title popup__info-title_rating">Raiting</h2>
                        <svg width="110" height="110" viewBox="0 0 160 160" style={{ transform: "rotate(-90deg)" }}>
                            <circle r="70" cx="80" cy="80" fill="transparent" stroke="rgba(85, 84, 84, 0.5)" stroke-width="12px"></circle>
                            <circle r="70" cx="80" cy="80" fill="transparent" stroke="#fd5252" stroke-linecap="round" stroke-width="12px" stroke-dasharray={dashArray} stroke-dashoffset={dashOffset}></circle>
                            <text x="50px" y="-63px" fill="#fff" font-size="42px" font-weight="500"
                                style={{ transform: "rotate(90deg)" }}>{movie?.movie.vod.user_score.toFixed(1)}</text>
                        </svg>
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
                        <p className="popup__info-subtitle">{dateConvertor(movie?.movie.vod.prime_date)}</p>
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
            {loading && <Player videoData={videoData} setVideoData={setVideoData} />}
        </div >
    );
}

export default MoviePopup;