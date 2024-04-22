import { React, useEffect, useState } from "react";
import './Player.css';

function Player({ videoData, setVideoData }) {

    useEffect(() => {
        console.log(videoData, "UPDATE");


        //REMOVE OLD PLAYER
        const oldPlayer = document.getElementById('videoStream');
        if (oldPlayer !== null) {
            oldPlayer.remove();
            console.log("DISPOSE");

        }

        // setTest(videoData)

        const newVideo = document.createElement('video');
        newVideo.id = 'videoStream';
        newVideo.className = 'video-js vjs-default-skin';

        newVideo.style.width = window.innerWidth / 2 + 'px'
        newVideo.style.height = window.innerHeight / 1.8 + 'px'

        // newVideo.setAttribute("controls", "controls");
        // newVideo.setAttribute("autoplay", "any");
        // newVideo.setAttribute("muted", "muted");
        newVideo.setAttribute('data-setup', '{ "fluid": false,  "inactivityTimeout": 0}');
        document.getElementById('video').append(newVideo);

        // VIDEO SOURCE
        const newSource = document.createElement('source');
        if (videoData.videoUrl.split('.').slice(-1)[0] === 'mp4') {
            newSource.type = "video/mp4";
        }
        else if (videoData.videoUrl.split('.').slice(-1)[0] === 'm3u8') {
            newSource.type = "application/x-mpegURL";
        }
        newSource.src = videoData.videoUrl;
        document.getElementById('videoStream').appendChild(newSource)

        // CREATE SCRIPT TAG & ADD TO PAGE
        const sp = document.createElement('script');
        sp.setAttribute('type', 'text/javascript');
        sp.src = 'https://vjs.zencdn.net/8.10.0/video.min.js';
        document.getElementById('videoStream').appendChild(sp);
        sp.async = true;
        document.body.appendChild(sp);
        // AUTOPLAY VIDEO
        if (document.getElementById('videoStream')) {
            setTimeout(function () { playVideo(); }, 500);
        }
        return () => {
            document.body.removeChild(sp);
        }
    }, [setVideoData, videoData]);


    function playVideo() {
        console.log('RUN VIDEO');
        let playBtn = document.querySelector('.vjs-big-play-button');
        playBtn.click();
    }

    return (
        <div id="video" className="video-style">
        </div>
    );
}

export default Player;