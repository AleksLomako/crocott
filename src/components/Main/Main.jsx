import { React, useState } from 'react';
import './Main.css';
import TvChannelsList from '../TvChannelsList/TvChannelsList';


// import { useEffect, useState, useCallback } from 'react';

import Player from '../Player/Player';

function Main() {
    const [videoData, setVideoData] = useState({})

    const [loading, setLoading] = useState(false);

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