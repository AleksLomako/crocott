import React from "react";
import './MoviesList.css';
import MovieCard from "../MovieCard/MovieCard";


function MoviesList({ moviesList, onMovieClick }) {

    // const movies = JSON.parse(localStorage.getItem('movies_crocOTT'));


    return (
        <div className="movieslist">
            <ul className="movieslist__items">
                {moviesList.map((movie) => (
                    <MovieCard
                        movie={movie}
                        movieImg={movie.vod.preview_icon}
                        movieCount={movie.view_count}
                        key={movie.id}
                        onMovieClick={onMovieClick}
                    />
                ))}
            </ul>
        </div>
    );
}

export default MoviesList;