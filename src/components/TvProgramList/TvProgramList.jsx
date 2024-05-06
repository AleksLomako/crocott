import React from "react";
import './TvProgramList.css';
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

        </div>
    );
}

export default TvProgramList;