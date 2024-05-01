import React from "react";
import './TvProgramList.css';
import TvProgramCard from "../TvProgramCard/TvProgramCard";


function TvProgramList({ tvProgram }) {

    console.log(tvProgram);
    // console.log((new Date(tvProgram[0].start)));


    // function testProgram(){
    //     tvProgram.forEach(element => {
    //         console.log(element.title);
    //     });
    // }

    // testProgram()


    // const tvPrograms = tvProgram.map(item => {
    //     return item
    // })

    // console.log(tvPrograms)

    return (
        <div className="programs">
            <ul className="programs__list">
                {tvProgram.map((program) => (
                    <TvProgramCard
                        title={program.title} />
                ))}
            </ul>

        </div>
    );
}

export default TvProgramList;