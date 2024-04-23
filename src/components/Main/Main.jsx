import { React, useState, useEffect, useCallback } from 'react';
import './Main.css';
import TvChannelsList from '../TvChannelsList/TvChannelsList';


// import { useEffect, useState, useCallback } from 'react';

import Player from '../Player/Player';

function Main() {
    const [videoData, setVideoData] = useState({})
    const [loading, setLoading] = useState(false);


    // NAVIGATION
    const [elementIndex, setElementIndex] = useState(0);
    const [elementNav, setElementNav] = useState('.header');
    const [endIndex, setEndIndex] = useState(0);
    const [headerElemList, setHeaderElemList] = useState('');
    const [channelsElemList, setChannelsElemList] = useState('');

    useEffect(() => {
        const header = document.querySelector('.header');
        setHeaderElemList(header.querySelectorAll('a'));
        const channels = document.querySelector('.channels');
        setChannelsElemList(channels.querySelectorAll('li'));
    }, []);


    function runNav() {
        if (document.activeElement.className === "body") {
            document.querySelector('.header__link_active').focus();
        }
    }


    const handleKeyPress = useCallback((e) => {
        console.log(e.keyCode);
        console.log(elementNav);
        let indexElem = elementIndex;
        //  HEADER NAV
        if (elementNav === ".header") {
            setEndIndex(headerElemList.length)
            if (e.code === "ArrowRight" && indexElem !== endIndex - 1) {
                indexElem = elementIndex + 1;
                headerElemList[indexElem].focus();
                setElementIndex(indexElem)
            }
            else if (e.code === "ArrowLeft" && elementIndex !== 0) {
                indexElem = elementIndex - 1;
                headerElemList[indexElem].focus();
                setElementIndex(indexElem)
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
                indexElem = elementIndex + 1;
                channelsElemList[indexElem].focus();
                setElementIndex(indexElem)
            }
            else if (e.code === "ArrowUp" && elementIndex !== 0) {
                indexElem = elementIndex - 1;
                channelsElemList[indexElem].focus();
                setElementIndex(indexElem)
            }
            else if (e.code === "ArrowUp" && elementIndex === 0) {
                setElementNav('.header');
                setElementIndex(0)
                headerElemList[0].focus();
            }
            else if (e.code === "Enter"){
                document.activeElement.click();
            }
        }
    }, [elementIndex, elementNav, endIndex, headerElemList, channelsElemList])

    useEffect(() => {
        // attach the e listener
        document.addEventListener('keydown', handleKeyPress);
        runNav();

        // remove the e listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);
    // ////////////////////////////////////////////////////////////////////////





    function test(display_name, urls) {
        setLoading(true)
        // console.log(display_name, urls);

        setVideoData({
            "videoUrl": urls[0],
            "videoName": display_name
        })
    }

    return (
        <main className="livetv">
            <TvChannelsList onClick={test} />
            <div>
                {loading && <Player videoData={videoData} setVideoData={setVideoData} />}
                <h1>{videoData.videoName}</h1>
            </div>
            <div></div>
        </main>
    )





















    // useEffect(()=>{
    //     const jwt = localStorage.getItem('jwtCrocOtt');
    //     document.getElementById('test-video').textContent = jwt;
    // },[])

    // function clearLocalJwt(){
    //     console.log("CLEAR");
    // }


    // return (
    //     <main className="main">
    //         {/* <div id='test-video'></div>
    //         <h1>TEST</h1>
    //         <button onClick={clearLocalJwt}>CLEAR JWT</button> */}
    //     </main >
    // );
}

export default Main;