import { React, useState } from 'react';
import './Movies.css';
import MoviesList from "../MoviesList/MoviesList";
import MoviePopup from '../MoviePopup/MoviePopup';


function Movies({ moviesList }) {

    const [selectedMovie, setSelectedMovie] = useState(null);

    // console.log(moviesList)

    function handleMovieClick(movie) {
        // console.log(movie)
        setSelectedMovie(movie)
    }


    return (
        <section className="movies">
            <div className="movies__links">
                <li className="movies__item">First</li>
                <li className="movies__item">Sports</li>
                <li className="movies__item">Films</li>
                <li className="movies__item">Cartoons</li>
            </div>
            <MoviesList
                onMovieClick={handleMovieClick}
                moviesList={moviesList} />
            <MoviePopup
                movie={selectedMovie} />
        </section>
    );
}

export default Movies;