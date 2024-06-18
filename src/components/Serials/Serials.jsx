import { React } from "react";
import './Serials.css';
import MoviesList from "../MoviesList/MoviesList";


function Serials() {

    const serials = JSON.parse(localStorage.getItem('serials_crocOTT'));
    console.log(serials)

    return (
        <section className="movies">
            <div className="movies__links">
                <li className="movies__item header__link_active" tabIndex={0}>All</li>
            </div>
            <MoviesList
                groupMoviesList={serials} />
        </section>
    );
}

export default Serials;