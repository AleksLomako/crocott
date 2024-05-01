import React from "react";
import './TvProgramCard.css';


function TvProgramCard({title}) {

    return (
        <li className="program" tabIndex="0">
                <h1 className="program__title">{title}</h1>
        </li>
    );
}

export default TvProgramCard;