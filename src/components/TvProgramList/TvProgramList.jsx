import React from "react";
import './TvProgramList.css';
import Point from '../../images/icons8-high-importance-48.png';
import TvProgramCard from "../TvProgramCard/TvProgramCard";


function TvProgramList({ tvProgram }) {

    const checkTvProgram = (tvProgram) => {
        let data = [];
        if (tvProgram) {
            if (tvProgram.length !== 0) {
                data = tvProgram
            }
        }
        return data
    }

    const programs = checkTvProgram(tvProgram).map(function (prog) {
        return prog
    })

    return (
        <div className="programs">
            {programs.length === 0 ? (
                    <div className="programs__list programs__list_empty">
                        <img className="programs__icon" src={Point} alt="Exclamation point" />
                        <p className="programs__text">No programs available</p>
                    </div>
            ) : (
                    <ul className="programs__list">
                        {programs.map((program, index) => (
                            <TvProgramCard
                                key={index}
                                title={program.title}
                                programInfo={program.dateInfo}
                                programActive={program.active}
                            />
                        ))}
                    </ul>
            )}
        </div>
    );
}

export default TvProgramList;