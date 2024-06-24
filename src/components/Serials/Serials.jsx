import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import './Serials.css';
import MoviesList from "../MoviesList/MoviesList";


function Serials() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const header = document.querySelector('.header__link_active');
    const serials = JSON.parse(localStorage.getItem('serials_crocOTT'));
    // console.log(serials)
    const navigate = useNavigate();

    const [elementNav, setElementNav] = useState('');

    // HANDLE REMOTE CONTROL
    const handleKeyPress = useCallback((e) => {
        e.preventDefault();

        //  HEADER NAV
        if (elementNav === ".header") {
            if (e.keyCode === 39) {
                // console.log("/packages");
                // let logout = document.getElementById('logout');
                // document.activeElement.classList.remove('header__link_active')
                // logout.classList.add('header__link_active');
                // logout.focus();
                // console.log(document.getElementById('logout'));
                // document.activeElement.blur();
                // navigate('/packages')
            }
            else if (e.keyCode === 37) {
                // document.activeElement.blur();
                // document.getElementById('logout').classList.remove('header__link_active')
                navigate('/movies')
            }
            else if (e.keyCode === 40) {
                // document.activeElement.blur();
                // setElementNav('.groups');
                // moviesGroups[activeGroupIndex].focus()
            }
            else if (e.keyCode === 13) {
                document.activeElement.click()
            }
        }
    }, [elementNav])

    // HANDLE CLICK MOUSE
    const handleClickOutside = useCallback((e) => { }, [])


    // ADD & REMOVE LISTENER
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleKeyPress, handleClickOutside]);

    // HEADER FOCUS and MOVIES GROUPS
    useEffect(() => {
        header.focus();
        setElementNav('.header')
        // const groups = document.querySelectorAll('.movies__item');
        // if (groups.length !== 0) {
        //     setMoviesGroups(groups)
        //     setEndIndex(moviesGroups.length)
        // }
    }, [header]);

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