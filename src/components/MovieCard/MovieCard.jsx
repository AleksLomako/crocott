import React from "react";
import './MovieCard.css';
import ViewCountEye from '../../images/icons8-eye-24.png';


function MovieCard(movie) {

    function handleClick() {
        movie.onMovieClick(movie)
    }

    return (
        <li className="moviecard" tabIndex={0} onClick={handleClick}>
            <img className="moviecard__img" src={movie.movieImg} alt="Eye" />
            <button className="moviecard__btn">
                <img className="moviecard__eye" src={ViewCountEye} alt="Eye" />
                <p className="moviecard__count">{movie.movieCount}</p>
            </button>
        </li>
    );
}

export default MovieCard;