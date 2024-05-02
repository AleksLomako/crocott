import React from "react";
import './MovieCard.css';
import ViewCountEye from '../../images/icons8-eye-24.png';


function MovieCard({movieImg, movieCount}) {

    return (
        <li className="moviecard">
            <img className="moviecard__img" src={movieImg} alt="Eye" />
            <button className="moviecard__btn">
                <img className="moviecard__eye" src={ViewCountEye} alt="Eye" />
                <p className="moviecard__count">{movieCount}</p>
            </button>
        </li>
    );
}

export default MovieCard;