import { React, useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import './Player.css';
import IconRight from '../../images/icons8-forward-5-30.png';
import IconBack from '../../images/icons8-replay-5-30.png';

function Player({ movie, videoData }) {

    const [state, setState] = useState(false)
    const location = useLocation();
    const [actualLink, setActualLink] = useState('')


    useEffect(() => {
        if (state === true && actualLink !== videoData.videoUrl) {
            deletePlayer()
            setActualLink(videoData.videoUrl)

        }
        setState(true)
    }, [state, videoData])


    // DELETE OLD PLAYER
    function deletePlayer() {
        try {
            let player = document.getElementById('videoStream_html5_api');
            eval(`videojs(player).dispose();`)
            addPlayer()
        }
        catch {
            addPlayer()
        }
    }

    //CREATE AND ADD PLAYER
    function addPlayer() {
        // CREATE PLAYER DIV
        const newVideo = document.createElement('video');
        newVideo.id = 'videoStream';
        newVideo.className = 'video-js vjs-default-skin';
        newVideo.style.width = videoData.width;
        newVideo.style.height = videoData.height;
        if (videoData.controls) {
            newVideo.setAttribute("controls", "controls");
        }
        newVideo.setAttribute('data-setup', '{ "fluid": false,  "inactivityTimeout": 0},');
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
        sp.src = 'https://vjs.zencdn.net/8.16.1/video.min.js';
        document.getElementById('videoStream').appendChild(sp);
        sp.async = true;
        // AUTOPLAY VIDEO
        if (document.getElementById('videoStream')) {
            if (videoData.controls) {
                document.getElementById('video').classList.add('popup_movie_style')
                setTimeout(function () { playVod(); }, 3000);
            }
            else {
                setTimeout(function () { playLiveTv(); }, 2000);
            }
        }
        else {
            console.log("NOT FOUND VIDEO STREEM");
        }
    }

    // RUN VIDEO IN LIVETV
    function playLiveTv() {
        try {
            let playBtn = document.querySelector('.vjs-big-play-button');
            playBtn.click();
        }
        catch {
            console.log("await player");
            if (document.getElementById('videoStream') && location.pathname === '/livetv') {
                setTimeout(function () { playLiveTv(); }, 2000);
            }
            else {
                console.log("close player");
            }
        }
    }

    // CREATE PLAYER OVERLAY AND RUN VIDEO IN MOVIES
    function playVod() {
        try {
            let controlBar = document.querySelector('.vjs-control-bar');
            let playerOverlay = document.createElement('div');
            playerOverlay.id = 'playerOverlay';
            controlBar.appendChild(playerOverlay)
            playerOverlay.textContent = movie.movie.vod.preview_icon
            playerOverlay.innerHTML = `<img style="width: 150px; 
                    height: 250px; 
                    position: absolute;
                    top: 20px; 
                    left: 170px;" src=${movie.movie.vod.preview_icon} alt="Movie Icon" 
                    />
                    <h1 style="position: absolute;
                    top: 60px;
                    left: 362px;
                    font-size: 40px;
                    font-weight: 500;
                    max-width: 800px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;">${movie.movie.vod.display_name}
                    </h1>
                    <img id='skip_back' tabindex='0' style="padding: 10px;
                    border-radius: 3px;
                    position: absolute;
                    top: 200px;
                    left: 900px;" src=${IconBack} alt="Icon Back"/>
                    <img id='skip_forward' tabindex='0' style="padding: 10px;
                    border-radius: 3px;
                    position: absolute;
                    top: 200px;
                    left: 1020px;" src=${IconRight} alt="Icon Back"/>
                    `
            let playBtn = document.querySelector('.vjs-big-play-button');
            playBtn.click();
            setTimeout(function () { removeFocus(); }, 3000);
        }
        catch {
            if (document.getElementById('videoStream') && location.pathname === "/movies") {
                setTimeout(function () { playVod(); }, 2000);
            }
        }
    }

    // REMOVE DEFAULT PLAYER FOCUS
    function removeFocus() {
        try {
            let video = document.getElementById('video')
            video.focus()
            if (document.activeElement.id !== 'video' && location.pathname === "/movies") {
                console.log("LOADING");
                setTimeout(function () { removeFocus(); }, 1000);
            }
        }
        catch { }
    }


    return (
        <div id="video" className="video-style" tabIndex={0}>
        </div>
    );
}

export default memo(Player);
