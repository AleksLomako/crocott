import React from 'react';
import './Header.css';
import Logo from '../../images/logo.png';
import IconGear from '../../images/icon-gear.png'
import IconPower from '../../images/icons8-shutdown.png';

import { NavLink, Link } from 'react-router-dom';

function Header({onExit}) {


    return (
        <header className="header">
            <img className="header__logo" src={Logo} alt="logo"></img>
            <nav className="header__navigate">
                <div className="header__links">
                    <NavLink to="/test_main" tabIndex="0" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>LiveTV</NavLink>
                    <NavLink to="/movies" tabIndex="0" className="header__link">Movies</NavLink>
                    <NavLink to="/series" tabIndex="0" className="header__link">Series</NavLink>
                    <NavLink to="/packages" tabIndex="0" className="header__link">Packages</NavLink>
                </div>
                <div className="header__settings">
                    <Link to="/settings">
                        <img className="header__icon" src={IconGear} alt="Gear icon" />
                    </Link>
                    <Link to="/signinlogin" onClick={onExit}>
                        <img className="header__icon" src={IconPower} alt="Power button" />
                    </Link>
                </div>
            </nav>

        </header>
    );
}

export default Header;