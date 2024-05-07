import React from "react";
import './MoviesList.css';
import MovieCard from "../MovieCard/MovieCard";


function MoviesList({ moviesList }) {

    // const movies = JSON.parse(localStorage.getItem('movies_crocOTT'));

    return (
        <div className="movieslist">
            <ul className="movieslist__items">
                {moviesList.map((movie) => (
                    <MovieCard
                        movieImg={movie.vod.preview_icon}
                        movieCount={movie.view_count}
                        key={movie.id}
                    />
                ))}
            </ul>
        </div>
    );
}

export default MoviesList;