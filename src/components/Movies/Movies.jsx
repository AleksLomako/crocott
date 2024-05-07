import React from "react";
import './Movies.css';
import MoviesList from "../MoviesList/MoviesList";


function Movies({ moviesList }) {


    const content = JSON.parse(localStorage.getItem('fullContent_crocOTT'));
    console.log(content);

    return (
        <section className="movies">
            <div className="movies__links">
                <li className="movies__item">First</li>
                <li className="movies__item">Sports</li>
                <li className="movies__item">Films</li>
                <li className="movies__item">Cartoons</li>
            </div>
            <MoviesList moviesList={moviesList} />
        </section>
    );
}

export default Movies;