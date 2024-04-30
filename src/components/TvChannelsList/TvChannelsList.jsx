import React from "react";
import './TvChannelsList.css';
import TvChannelCard from '../TvChannelCard/TvChannelCard';
import IconArrowBack from '../../images/icons8-back-50.png';
import IconArrowForward from '../../images/icons8-forward-50.png';

function TvChannelsList({ onClick, activeGroup}) {


    const content = JSON.parse(localStorage.getItem('streams_crocOTT'))
    const channels = (content, active_group) => {
        let channels = [];
        content.forEach(stream => {
            if (active_group === "All") {
                channels.push(stream)
            }
            else {
                stream.groups.forEach(group => {
                    if (active_group === group) {
                        channels.push(stream)
                    }
                })
            }
        })
        return channels;
    }

    const channels1 = channels(content, activeGroup).map(function (stream) {
        return stream.epg;
    })

    

    return (
        <div className="channels">
            <div className="channels__item" tabIndex="0">
                {/* <p>&lt;</p> */}
                <img className="channels__icon" src={IconArrowBack} alt="arrow" tabIndex="0"></img>
                <p className="channels__text">{activeGroup}</p>
                {/* <p>&gt;</p> */}
                <img className="channels__icon" src={IconArrowForward} alt="arrow" tabIndex="0"></img>
            </div>
            <div className="channels__wrap">
                <ul className="channels__list">
                {
                        channels1.map((channel, index) => (
                            <TvChannelCard
                                key={index}
                                icon={channel.icon}
                                urls={channel.urls}
                                display_name={channel.display_name}
                                onClick={onClick}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default TvChannelsList;