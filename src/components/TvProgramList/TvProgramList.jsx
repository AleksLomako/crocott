import React from "react";
import './TvProgramList.css';
import TvProgramCard from "../TvProgramCard/TvProgramCard";


function TvProgramList({ tvProgram }) {

    ///////////     ДАТА
    // const start = tvProgram.map(el => {
    //     return (el.start)
    // })

    // const date = start.map(el => {
    //     return (new Date(el))
    // })

    // function padTo2Digits(num) {
    //     return num.toString().padStart(2, '0'); // Преобразует 9 в 09, а 10 оставит без изменений
    // }

    // date.forEach(el => {
    //     console.log(padTo2Digits(el.getDate()) + '.' + padTo2Digits(el.getMonth() + 1))
    // })


    return (
        <div className="programs">
            {/* <ul className="programs__list">
                {tvProgram.map((program, index) => (
                    <TvProgramCard
                        title={program.title}
                        key={index} />
                ))}
            </ul> */}
            <p className="test">No programs available</p>
        </div>
    );
}

export default TvProgramList;