import { React, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import TvChannelsList from '../TvChannelsList/TvChannelsList';
import Player from '../Player/Player';

function Main() {
    // Player
    const [videoData, setVideoData] = useState({})
    const [loading, setLoading] = useState(false);
    // LIVE TV
    const [activeGroup, setActiveGroup] = useState("All")
    const [activeGroupIndex, setActiveGroupIndex] = useState(0)
    // NAVIGATION
    const navigate = useNavigate();
    const [elementIndex, setElementIndex] = useState(0);
    const [elementNav, setElementNav] = useState('');
    const [endIndex, setEndIndex] = useState(0);
    const [headerElemList, setHeaderElemList] = useState('');
    const [channelsElemList, setChannelsElemList] = useState('');
    const channelsGroupsElement = document.querySelector('.channels__item');


    const handleKeyPress = useCallback((e) => {
        let indexGroup = activeGroupIndex
        let indexElem = elementIndex;
        //  HEADER NAV
        if (elementNav === ".header") {
            if (e.code === "ArrowRight") {
                document.activeElement.blur();
                navigate('/movies')
            }
            else if (e.code === "ArrowDown") {
                setElementNav('.groups');
                setElementIndex(0)
                channelsGroupsElement.focus()
            }
        }
        // GROUPS NAV
        else if (elementNav === ".groups") {
            if (e.code === "ArrowRight" && activeGroupIndex !== groupsList().length - 1) {
                indexGroup = activeGroupIndex + 1
                setActiveGroupIndex(indexGroup)
                setActiveGroup(groupsList()[indexGroup])
            }
            else if (e.code === "ArrowLeft" && activeGroupIndex !== 0) {
                indexGroup = activeGroupIndex - 1
                setActiveGroupIndex(indexGroup)
                setActiveGroup(groupsList()[indexGroup])
            }
            else if (e.code === "ArrowUp") {
                setElementNav('.header');
                setElementIndex(0)
                headerElemList[0].focus()
            }
            else if (e.code === "ArrowDown") {
                setElementNav('.channels');
                setElementIndex(0)
                channelsElemList[0].focus()
            }
        }
        // CHANNEL NAV
        else if (elementNav === ".channels") {
            setEndIndex(channelsElemList.length)
            if (e.code === "ArrowDown" && indexElem !== endIndex - 1) {
                try {
                    indexElem = elementIndex + 1;
                    channelsElemList[indexElem].focus();
                    setElementIndex(indexElem)
                }
                catch { }
            }
            else if (e.code === "ArrowUp" && elementIndex !== 0) {
                indexElem = elementIndex - 1;
                channelsElemList[indexElem].focus();
                setElementIndex(indexElem)
            }
            else if (e.code === "ArrowUp" && elementIndex === 0) {
                setElementNav('.groups');
                setElementIndex(0)
                channelsGroupsElement.focus()
            }
            else if (e.code === "Enter") {
                document.activeElement.click();
            }
        }
    }, [navigate, activeGroupIndex, elementIndex, elementNav, endIndex, headerElemList, channelsElemList, channelsGroupsElement])


    const handleClickOutside = useCallback((e) => {
        let indexElem = 0;
        let elementClassName = (document.activeElement.className.split(' ')[0]);
        if (channelsElemList !== '' && document.activeElement.className === "channel") {
            channelsElemList.forEach((element) => {
                if (document.activeElement === element) {
                    channelsElemList[indexElem].focus();
                    setElementIndex(indexElem);
                    setElementNav('.channels')
                }
                indexElem++
            })
        }
        else if (headerElemList !== '' && elementClassName === "header__link") {
            headerElemList.forEach((element) => {
                if (document.activeElement === element) {
                    headerElemList[indexElem].focus();
                    setElementIndex(indexElem);
                    setElementNav('.header')
                }
                indexElem++
            })
        }
    }, [headerElemList, channelsElemList]);





    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleKeyPress, handleClickOutside]);




    useEffect(() => {
        const header = document.querySelector('.header');
        setHeaderElemList(header.querySelectorAll('a'));
        const channels = document.querySelector('.channels');
        setChannelsElemList(channels.querySelectorAll('li'));
    }, [activeGroup])



    useEffect(() => {
        const header = document.querySelector('.header');
        setHeaderElemList(header.querySelectorAll('a'));
        const channels = document.querySelector('.channels');
        setChannelsElemList(channels.querySelectorAll('li'));
        if (channels.querySelectorAll('li').length !== 0) {
            // console.log(channels.querySelectorAll('li').length);
            const activeChannel = channels.querySelectorAll('li')[0]
            activeChannel.click();
            activeChannel.focus();
            setElementNav('.channels')
            setEndIndex(channels.querySelectorAll('li').length)
        }
        else {
            header.querySelectorAll('a')[0].focus();
            setElementNav('.header')
        }
    }, []);
    //////////////////////////////////////////////////////////////////////////


    // live TV TESTING
    const content = JSON.parse(localStorage.getItem('streams_crocOTT'))
    const groupsList = () => {
        let groups = ["All"]
        content.forEach(stream => {
            stream.groups.forEach(group => {
                groups.push(group)
            })
        });
        return groups.filter((item, i, ar) => ar.indexOf(item) === i)
    };


    function test(display_name, urls) {
        setLoading(true)
        setVideoData({
            "videoUrl": urls[0]["url"],
            "videoName": display_name
        })
    }

    return (
        <main className="livetv">
             <TvChannelsList onClick={test} activeGroup={activeGroup} />
            <div>
                {loading && <Player videoData={videoData} setVideoData={setVideoData} />}
                <h1 className="livetv__title">{videoData.videoName}</h1>
                <h2 className="livetv__program">Young and Hungry</h2>
                <p className="livetv__description">The official languages are English and Maori, with Wellington as the capital. For everyday communication and business meetings, 
                it is English that is used, but Maori is officially recognized as the co-official language.</p>
            </div>
            <div></div>
        </main>
    )
}

export default Main;