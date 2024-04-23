import React from "react";
import './TvChannelCard.css';


function TvChannelCard({ icon, display_name, urls, onClick }) {



function handleChannelClick() {
    onClick(display_name, urls);
}

    return (
        <li className="channel" urls={urls} tabIndex="0" id={display_name} onClick={handleChannelClick}>
                <img className="channel__icon" src={icon} alt="Icon channel" />
                <p className="channel__name">{display_name}</p>
        </li>
    );
}

export default TvChannelCard;