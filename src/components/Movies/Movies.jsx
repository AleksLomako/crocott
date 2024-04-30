import React from "react";

import './Movies.css';


function Movies() {

    return (
        <section className="movies">
            <div className="movies__list">
                <li className="movies__item">First</li>
                <li className="movies__item">Sports</li>
                <li className="movies__item">Films</li>
                <li className="movies__item">Cartoons</li>
            </div>
        </section>
    );
}

export default Movies;