import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import './Movies.css';
import MoviesList from "../MoviesList/MoviesList";
import MoviePopup from '../MoviePopup/MoviePopup';


function Movies({ moviesList }) {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const header = document.querySelector('.header__link_active');
    const content = JSON.parse(localStorage.getItem('fullContent_crocOTT'));
    const navigate = useNavigate();
    // GROUPS NAVIGATE CONST
    const [moviesGroups, setMoviesGroups] = useState('');
    const [activeGroup, setActiveGroup] = useState("All");
    const [activeGroupIndex, setActiveGroupIndex] = useState(0);
    const [elementNav, setElementNav] = useState('');
    const [endIndex, setEndIndex] = useState(0);
    const [groupMoviesList, setGroupsMoviesList] = useState(0);
    // MOVIES NAVIGATE CONST
    const [showMovies, setShowMovies] = useState(0);
    const [moviesIndex, setMoviesIndex] = useState(0);
    const column = Math.floor((window.screen.width - 60) / 170);


    useEffect(() => {
        if (activeGroup !== "All" && moviesList.length !== 0) {
            content.data.packages.forEach(packag => {
                if (packag.name === activeGroup) {
                    setGroupsMoviesList(packag.vods)
                }
            })
        }
        else {
            setGroupsMoviesList(moviesList)
        }
    }, [activeGroup])


    useEffect(() => {
        if (groupMoviesList.length !== 0) {
            setShowMovies(document.querySelectorAll('.moviecard'))
            setMoviesIndex(0)
        }
        else {
            setShowMovies(0)
            setMoviesIndex(0)
        }
    }, [activeGroup, groupMoviesList])


    // HANDLE REMOTE CONTROL
    const handleKeyPress = useCallback((e) => {
        e.preventDefault();
        // INDEXES
        let indexGroup = activeGroupIndex
        let indexElem = moviesIndex;
        //  HEADER NAV
        if (elementNav === ".header") {
            if (e.keyCode === 39) {
                document.activeElement.blur();
                navigate('/serials')
            }
            else if (e.keyCode === 37) {
                document.activeElement.blur();
                navigate('/test_main')
            }
            else if (e.keyCode === 40) {
                document.activeElement.blur();
                setElementNav('.groups');
                moviesGroups[activeGroupIndex].focus()
            }
        }
        // GROUPS NAV
        else if (elementNav === ".groups") {
            if (e.keyCode === 39 && indexGroup !== endIndex - 1) {
                moviesGroups[indexGroup].classList.remove('header__link_active')
                indexGroup = activeGroupIndex + 1;
                setActiveGroupIndex(indexGroup)
                setActiveGroup((moviesGroups[indexGroup]).textContent)
                moviesGroups[indexGroup].focus()
                setMoviesIndex(0)
                moviesGroups[indexGroup].classList.add('header__link_active')
            }
            else if (e.keyCode === 37 && activeGroupIndex !== 0) {
                moviesGroups[indexGroup].classList.remove('header__link_active')
                indexGroup = activeGroupIndex - 1;
                setActiveGroupIndex(indexGroup)
                setActiveGroup((moviesGroups[indexGroup]).textContent)
                moviesGroups[indexGroup].focus()
                setMoviesIndex(0)
                moviesGroups[indexGroup].classList.add('header__link_active')
            }
            else if (e.keyCode === 38) {
                setElementNav('.header');
                header.focus();
            }
            else if (e.keyCode === 40 && showMovies.length) {
                setElementNav('.movies');
                showMovies[indexElem].focus();
            }
        }
        // MOVIES NAV
        else if (elementNav === ".movies") {
            if (e.keyCode === 38) {
                try {
                    indexElem = moviesIndex - column;
                    showMovies[indexElem].focus()
                    setMoviesIndex(indexElem)
                }
                catch {
                    setElementNav('.groups');
                    moviesGroups[indexGroup].focus()
                }
            }

            else if (e.keyCode === 40) {
                try {
                    indexElem = moviesIndex + column;
                    showMovies[indexElem].focus()
                    setMoviesIndex(indexElem)
                }
                catch {
                }
            }
            else if (e.keyCode === 39) {
                try {
                    indexElem = moviesIndex + 1
                    showMovies[indexElem].focus()
                    setMoviesIndex(indexElem)
                }
                catch {
                }
            }
            else if (e.keyCode === 37) {
                try {
                    indexElem = moviesIndex - 1
                    showMovies[indexElem].focus()
                    setMoviesIndex(indexElem)
                }
                catch {
                }
            }
            else if (e.keyCode === 13) {
                document.activeElement.click();
            }
        }
    }, [column, showMovies, moviesIndex, groupMoviesList, activeGroupIndex, navigate, elementNav, endIndex, moviesGroups, header])


    // ADD & REMOVE LISTENER
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);


    // HEADER FOCUS and MOVIES GROUPS
    useEffect(() => {
        header.focus();
        setElementNav('.header')
        const groups = document.querySelectorAll('.movies__item');
        if (groups.length !== 0) {
            setMoviesGroups(groups)
            setEndIndex(moviesGroups.length)
        }
    }, [moviesGroups.length, header]);

    function handleMovieClick(movie) {
        setSelectedMovie(movie)
    }

    function handleCloseMovie() {
        setSelectedMovie(null);
    }

    return (
        <section className="movies">
            <div className="movies__links">
                <li className="movies__item header__link_active" tabIndex={0}>All</li>
                {content.data.packages.map((element) => (
                    <li className="movies__item" tabIndex={0}>{element.name}</li>
                ))}
            </div>
            <MoviesList
                onMovieClick={handleMovieClick}
                groupMoviesList={groupMoviesList} />
            <MoviePopup
                movie={selectedMovie}
                onClose={handleCloseMovie} />
        </section>
    );
}

export default Movies;