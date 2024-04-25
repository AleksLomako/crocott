import React from "react";
import './TvChannelsList.css';
import TvChannelCard from '../TvChannelCard/TvChannelCard';
// import content from '../../utils/content';
import IconArrowBack from '../../images/icons8-back-50.png';
import IconArrowForward from '../../images/icons8-forward-50.png';

function TvChannelsList({ onClick }) {

    const content = JSON.parse(localStorage.getItem('streams_crocOTT'))

    const channelsGroups = () => {
        let groups = ["All"]
        content.forEach(stream => {
            stream.groups.forEach(group => {
                groups.push(group)
            })
        });
        return groups.filter((item, i, ar) => ar.indexOf(item) === i)
    };
    
    
    
    console.log(channelsGroups());


    const channels = content.map(function (stream) {
        return stream.epg
    })


    return (
        <div className="channels">
            <div className="channels__item" tabIndex="0">
                <img className="channels__icon" src={IconArrowBack} alt="arrow" tabIndex="0"></img>
                <p className="channels__text">First</p>
                <img className="channels__icon" src={IconArrowForward} alt="arrow" tabIndex="0"></img>
            </div>
            <div className="channels__wrap">
                <ul className="channels__list">
                    {
                        channels.map((channel, index) => (
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