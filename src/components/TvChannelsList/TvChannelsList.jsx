import React from "react";
import './TvChannelsList.css';
import TvChannelCard from '../TvChannelCard/TvChannelCard';
import content from '../../utils/content';

function TvChannelsList({onClick}) {

    const channels = content.data.packages.map(function (element) {
        return element.streams.map(function (ep) {
            return ep.epg
        })
    })

    return (
        <div className="channels">
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