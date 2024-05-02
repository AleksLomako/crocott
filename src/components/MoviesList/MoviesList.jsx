import React from "react";
import './MoviesList.css';
import MovieCard from "../MovieCard/MovieCard";


function MoviesList() {

    const movies = JSON.parse(localStorage.getItem('movies_crocOTT'));

    console.log(movies)

    return (
        <div className="movieslist">
            <ul className="movieslist__items">
                {movies.map((movie) => (
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