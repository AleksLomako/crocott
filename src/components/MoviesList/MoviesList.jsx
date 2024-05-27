import React from "react";
import './MoviesList.css';
import MovieCard from "../MovieCard/MovieCard";


function MoviesList({ groupMoviesList, onMovieClick }) {


    return (
        <div className="movieslist">
            {groupMoviesList ? <ul className="movieslist__items">
                {groupMoviesList.map((movie) => (
                    <MovieCard
                        movieImg={movie.vod.preview_icon}
                        movieCount={movie.view_count}
                        key={movie.id}
                        onMovieClick={onMovieClick}
                        movie={movie}
                    />
                ))}

            </ul> : ''}
        </div>
    );
}

export default MoviesList;