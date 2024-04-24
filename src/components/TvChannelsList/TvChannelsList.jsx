import React from "react";
import './TvChannelsList.css';
import TvChannelCard from '../TvChannelCard/TvChannelCard';
import content from '../../utils/content';
import IconArrowBack from '../../images/icons8-back-50.png';
import IconArrowForward from '../../images/icons8-forward-50.png';

function TvChannelsList({onClick}) {

    const channels = content.data.packages.map(function (element) {
        return element.streams.map(function (ep) {
            return ep.epg
        })
    })

    return (
        <div className="channels">
            <div className="channels__item">
                <img className="channels__icon" src={IconArrowBack} alt="arrow" tabIndex="0"></img>
                <p className="channels__text">First</p>
                <img className="channels__icon" src={IconArrowForward} alt="arrow" tabIndex="0"></img>
            </div>
            <ul className="channels__list">
                {
                    channels[0].map((channel, index) => (
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

    );
}

export default TvChannelsList;