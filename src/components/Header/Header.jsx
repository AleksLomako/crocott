import React from 'react';
import './Header.css';
// import Logo from '../../images/logo.png';
import IconGear from '../../images/icon-gear.png'
import IconPower from '../../images/icons8-shutdown.png';
import { NavLink, Link } from 'react-router-dom';

function Header({ onExit, logo }) {


    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="logo"></img>
            <nav className="header__navigate">
                <div className="header__links">
                    <NavLink to="/test_main" tabIndex="0" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>LiveTV</NavLink>
                    <NavLink to="/movies" tabIndex="0" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>Movies</NavLink>
                    <NavLink to="/series" tabIndex="0" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>Series</NavLink>
                    <NavLink to="/packages" tabIndex="0" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>Packages</NavLink>
                </div>
                <div className="header__settings">
                    <Link to="/settings" tabIndex="0" className="header__link">
                        <img className="header__icon" src={IconGear} alt="Gear icon" />
                    </Link>
                    <Link to="/signinlogin" onClick={onExit} tabIndex="0" className="header__link">
                        <img className="header__icon" src={IconPower} alt="Power button" />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;