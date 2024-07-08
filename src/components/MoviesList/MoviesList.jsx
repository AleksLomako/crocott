import React from "react";
import './MoviesList.css';
import MovieCard from "../MovieCard/MovieCard";
import { useLocation } from "react-router-dom";


function MoviesList({ groupMoviesList, onMovieClick }) {

    const location = useLocation();

    return (
        <div className="movieslist">
            {location.pathname === '/movies' && (
                groupMoviesList ? <ul className="movieslist__items">
                    {groupMoviesList.map((movie) => (
                        <MovieCard
                            movieImg={movie.vod.preview_icon}
                            movieCount={movie.view_count}
                            key={movie.id}
                            onMovieClick={onMovieClick}
                            movie={movie}
                        />
                    ))}
                </ul> : ''
            )}
            {location.pathname === '/series' && (
                groupMoviesList ? <ul className="movieslist__items">
                    {groupMoviesList.map((movie) => (
                        <MovieCard
                            movieImg={movie.icon}
                            movieCount={movie.view_count}
                            key={movie.id}
                            onMovieClick={onMovieClick}
                            movie={movie}
                        />
                    ))}
                </ul> : ''
            )}
        </div>
    );
}

export default MoviesList;