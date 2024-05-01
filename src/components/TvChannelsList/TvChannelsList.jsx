import React from "react";
import './TvChannelsList.css';
import TvChannelCard from '../TvChannelCard/TvChannelCard';
// import IconArrowBack from '../../images/icons8-back-50.png';
// import IconArrowForward from '../../images/icons8-forward-50.png';


function TvChannelsList({ onClick, activeGroup}) {
    const streams = JSON.parse(localStorage.getItem('streams_crocOTT'))
    const content = (streams, active_group) => {
        let content = [];
        if (streams !== null){
            streams.forEach(stream => {
                if (active_group === "All") {
                    content.push(stream)
                }
                else {
                    stream.groups.forEach(group => {
                        if (active_group === group) {
                            content.push(stream)
                        }
                    })
                }
            })
            return content;
        }
        else{
            return [];
        }
        
    }

    const channels = content(streams, activeGroup).map(function (stream) {
        return stream.epg;
    })


    return (
        <div className="content">
            <div className="channels__item" tabIndex="0">
                <p>&lt;</p>
                {/* <img className="channels__icon" src={IconArrowBack} alt="arrow" tabIndex="0"></img> */}
                <p className="channels__text">{activeGroup}</p>
                <p>&gt;</p>
                {/* <img className="channels__icon" src={IconArrowForward} alt="arrow" tabIndex="0"></img> */}
            </div>
            <div className="channels__wrap">
                <ul className="channels__list">
                {(content(streams, activeGroup).length !==0)?
                        channels.map((channel, index) => (
                            <TvChannelCard
                                key={index}
                                icon={channel.icon}
                                urls={channel.urls}
                                display_name={channel.display_name}
                                onClick={onClick}
                                id={channel.id}
                            />
                        )): ""
                    }

                </ul>
            </div>
        </div>
    );
}

export default TvChannelsList;