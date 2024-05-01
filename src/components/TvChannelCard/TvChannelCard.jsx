import React from "react";
import './TvChannelCard.css';


function TvChannelCard({ icon, display_name, urls, onClick, id }) {



function handleChannelClick() {
    onClick(display_name, urls, id);
}

    return (
        <li className="channel" urls={urls} tabIndex="0" display_name={display_name} id={id} onClick={handleChannelClick}>
                <img className="channel__icon" src={icon} alt="Icon channel" />
                <p className="channel__name">{display_name}</p>
        </li>
    );
}

export default TvChannelCard;