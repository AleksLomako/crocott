import React, { } from "react";
import './TvProgramCard.css';


function TvProgramCard({ title, programInfo, programActive }) {
    let activeProgram;
    if (programActive === true) {
        activeProgram = <li id="actual_program" className="program program_active" tabIndex="0">
            <h1 className="program__title">{title}</h1>
            <p className="program__time">{programInfo}</p>
        </li>
    }
    else if (programActive === false) {
        activeProgram = <li className="program" tabIndex="0">
            <h1 className="program__title">{title}</h1>
            <p className="program__time">{programInfo}</p>
        </li>
    }
    else {
        activeProgram = <li className="program program_last" tabIndex="0">
            <h1 className="program__title">{title}</h1>
            <p className="program__time">{programInfo}</p>
        </li>
    }
    return (
        activeProgram
    );
}

export default TvProgramCard;