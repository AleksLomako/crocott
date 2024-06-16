import { React, useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import './Movies.css';
import MoviesList from "../MoviesList/MoviesList";
import MoviePopup from '../MoviePopup/MoviePopup';


function Movies({ moviesList }) {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const header = document.querySelector('.header__link_active');
    const content = JSON.parse(localStorage.getItem('movies_crocOTT'));
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
    // POPUM NAV
    const [popupNavElem, setPopupNavElem] = useState('arrow')



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
                navigate('/series')
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
        // POPUP NAV
        else if (elementNav === '.movies_popup') {
            if (e.keyCode === 8) {
                handleCloseMovie()
                const oldPlayer = document.getElementById('videoStream');
                if (oldPlayer !== null) {
                    oldPlayer.remove();
                }
                showMovies[moviesIndex].focus()
                setPopupNavElem('arrow');
                setElementNav('.movies');
                console.log(column);
            }
            else if (popupNavElem === 'arrow') {
                if (e.keyCode === 13) {
                    handleCloseMovie()
                    const oldPlayer = document.getElementById('videoStream');
                    if (oldPlayer !== null) {
                        oldPlayer.remove();
                    }
                    document.activeElement.blur();
                    showMovies[moviesIndex].focus()
                    setPopupNavElem('arrow');
                    setElementNav('.movies');
                }
                else if (e.keyCode === 39) {
                    setPopupNavElem('popup__play')
                    document.querySelector('.popup__play-btn').focus()
                }
            }
            else if (popupNavElem === 'popup__play') {
                if (e.keyCode === 13) {
                    console.log('PLAY');
                    document.activeElement.click();
                }
                else if (e.keyCode === 37) {
                    setPopupNavElem('arrow');
                    document.querySelector('.arrow').focus()
                }
                else if (e.keyCode === 39) {
                    setPopupNavElem('trailer');
                    document.querySelector('.popup__play-btn_trailer').focus()
                }
            }
            else if (popupNavElem === 'trailer') {
                if (e.keyCode === 13) {
                    console.log('PLAY TREILER');
                }
                else if (e.keyCode === 37) {
                    setPopupNavElem('popup__play');
                    document.querySelector('.popup__play-btn').focus()
                }
                else if (e.keyCode === 39) {
                    setPopupNavElem('star');
                    document.querySelector('.star').focus()
                }
            }
            else if (popupNavElem === 'star') {
                if (e.keyCode === 13) {
                    console.log('PLAY TREILER');
                }
                else if (e.keyCode === 37) {
                    setPopupNavElem('trailer');
                    document.querySelector('.popup__play-btn_trailer').focus()
                }
            }
        }

        // }
    }, [popupNavElem, column, showMovies, moviesIndex, groupMoviesList, activeGroupIndex, navigate, elementNav, endIndex, moviesGroups, header])


    // HANDLE CLICK MOUSE
    const handleClickOutside = useCallback((e) => {
        try {
            let indexGroup = 0;
            moviesGroups.forEach((group) => {
                group.classList.remove('header__link_active');
                if (document.activeElement.textContent === group.textContent) {
                    moviesGroups[indexGroup].classList.remove('header__link_active');
                    setActiveGroupIndex(indexGroup);
                    setActiveGroup((moviesGroups[indexGroup]).textContent);
                    moviesGroups[indexGroup].focus();
                    setMoviesIndex(0);
                    moviesGroups[indexGroup].classList.add('header__link_active');
                    setElementNav('.groups');
                }
                indexGroup++
            })
        }
        catch {
        }


    }, [moviesGroups])


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
        const groups = document.querySelectorAll('.movies__item');
        if (groups.length !== 0) {
            setMoviesGroups(groups)
            setEndIndex(moviesGroups.length)
        }
    }, [moviesGroups.length, header]);

    function handleMovieClick(movie) {
        setSelectedMovie(movie);
        setElementNav('.movies_popup');
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