import { React, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './LiveTv.css';
import TvChannelsList from '../TvChannelsList/TvChannelsList';
import Player from '../Player/Player';
import TvProgramList from '../TvProgramList/TvProgramList';
import EmptyContent from '../EmptyContent/EmptyContent';
import mainApi from '../../utils/MainApi';
import saveJwt from '../../utils/saveJwt';
import processingProgramData from '../../utils/processingProgData';


function LiveTv({ liveTvList, isExitPopupOpen }) {

    const content = JSON.parse(localStorage.getItem('streams_crocOTT'))

    // PLAYER STATES
    const [videoData, setVideoData] = useState({});
    const [loading, setLoading] = useState(false);

    // LIVE TV GROUPS STATES
    const [activeGroup, setActiveGroup] = useState("All");
    const [activeGroupIndex, setActiveGroupIndex] = useState(0);

    // Live Tv program STATES
    const [tvProgram, setTvProgram] = useState([]);
    const [programElemIndex, setProgramElemIndex] = useState(0);
    const [processedProgData, setProcessedProgData] = useState('');
    const [programDesc, setProgramDesc] = useState('');
    const [programTitle, setProgramTitle] = useState('');
    const [programElemList, setProgramElemList] = useState('');
    const [scrollToActualProg, setScrollToActualProg] = useState(false);

    // NAVIGATION STATES
    const navigate = useNavigate();
    const [elementIndex, setElementIndex] = useState(0);
    const [elementNav, setElementNav] = useState('');
    const [endIndex, setEndIndex] = useState(0);
    const [headerElemList, setHeaderElemList] = useState('');
    const [channelsElemList, setChannelsElemList] = useState('');
    const channelsGroupsElement = document.querySelector('.channels__item');
    const [fullScreen, setFullScreen] = useState(false)
    const [scrollY, setScrollY] = useState('')
    const [scrollYProgram, setScrollYProgram] = useState('')
    const [exitPopupElement, setExitPopupElement] = useState('exit-popup__no');

    // PLAYER STATE
    const [updatePlayer, setUpdatePlayer] = useState(false)
    const [statePlayer, setStatePlayer] = useState(false)
    const [firstRun, setFirstRun] = useState(false)


    // HANDLE REMOTE CONTROL
    const handleKeyPress = useCallback((e) => {
        e.preventDefault();
        // INDEXES
        let indexGroup = activeGroupIndex
        let indexElem = elementIndex;
        let programIndexElem = programElemIndex;
        let exitPopupElem = exitPopupElement;
        // EXIT POPUP CLOSE
        if (isExitPopupOpen !== true) {
            //  HEADER NAV
            if (elementNav === ".header") {
                if (e.keyCode === 39) {
                    deletePlayer();
                    navigate('/movies');
                }
                else if (e.keyCode === 40) {
                    if(liveTvList.length !==0){
                        setElementNav('.groups');
                    setElementIndex(0)
                    channelsGroupsElement.focus()
                    } 
                }
                else if (e.keyCode === 461 || e.keyCode === 8) {
                    document.querySelector('.header__icon_exit').click()
                }
            }
            // GROUPS NAV
            else if (elementNav === ".groups") {
                if (e.keyCode === 39) {
                    if (activeGroupIndex !== groupsList().length - 1) {
                        indexGroup = activeGroupIndex + 1
                        setActiveGroupIndex(indexGroup)
                        setActiveGroup(groupsList()[indexGroup])
                    }
                    else {
                        indexGroup = 0;
                        setActiveGroupIndex(indexGroup)
                        setActiveGroup(groupsList()[indexGroup])
                    }
                }
                else if (e.keyCode === 37) {
                    if (activeGroupIndex !== 0) {
                        indexGroup = activeGroupIndex - 1
                        setActiveGroupIndex(indexGroup)
                        setActiveGroup(groupsList()[indexGroup])
                    }
                    else {
                        indexGroup = groupsList().length - 1;
                        setActiveGroupIndex(indexGroup)
                        setActiveGroup(groupsList()[indexGroup])
                    }
                }
                else if (e.keyCode === 38) {
                    setElementNav('.header');
                    setElementIndex(0)
                    headerElemList[0].focus()
                }
                else if (e.keyCode === 40) {
                    setElementNav('.channels');
                    setElementIndex(0)
                    channelsElemList[0].focus()
                }
                else if (e.keyCode === 461 || e.keyCode === 8) {
                    document.querySelector('.header__icon_exit').click()
                }
            }
            // CHANNEL NAV
            else if (elementNav === ".channels") {
                setEndIndex(channelsElemList.length)
                let wrap = document.querySelector('.channels__wrap');
                if (e.keyCode === 40 && indexElem !== endIndex - 1) {
                    try {
                        indexElem = elementIndex + 1;
                        channelsElemList[indexElem].focus();
                        setElementIndex(indexElem)
                        // SCROLL POSITION
                        setScrollY('')
                        if (scrollY === 'end') {
                            channelsElemList[indexElem].scrollIntoView(false)
                            wrap.scrollBy({ top: +6 })
                        }
                        let scroll = channelsElemList[indexElem].getBoundingClientRect();
                        if (scroll.y > window.screen.height - 305) {
                            setScrollY('end')
                        }
                    }
                    catch { }
                }
                else if (e.keyCode === 38 && elementIndex !== 0) {
                    indexElem = elementIndex - 1;
                    channelsElemList[indexElem].focus();
                    setElementIndex(indexElem)
                    // SCROLL POSITION

                    setScrollY('')
                    if (scrollY === 'start') {
                        channelsElemList[indexElem].scrollIntoView(true)
                        wrap.scrollBy({ top: -6 })

                    }
                    let scroll = channelsElemList[indexElem].getBoundingClientRect();
                    if (scroll.y < 200) {
                        setScrollY('start')
                    }
                }
                else if (e.keyCode === 38 && elementIndex === 0) {
                    setElementNav('.groups');
                    setElementIndex(0)
                    channelsGroupsElement.focus()
                }
                else if (e.keyCode === 13) {
                    document.activeElement.click();
                }
                else if (e.keyCode === 39) {
                    console.log();

                    setElementNav('.player');
                    document.getElementById('video').focus()
                }
                else if (e.keyCode === 461 || e.keyCode === 8) {
                    document.querySelector('.header__icon_exit').click()
                }
            }
            // PLAYER NAV
            else if (elementNav === ".player") {
                let player = document.getElementById('video');
                player.classList.add('video-style__active');
                if (e.keyCode === 37 && fullScreen === false) {
                    setElementNav('.channels');
                    channelsElemList[elementIndex].focus();
                    player.classList.remove('video-style__active')
                }
                else if (e.keyCode === 38 && fullScreen === false) {
                    setElementNav('.groups');
                    channelsGroupsElement.focus();
                    player.classList.remove('video-style__active')
                }
                else if (e.keyCode === 40 && fullScreen === false) {
                    try {
                        let description = document.querySelector('.livetv__description')
                        if (description.textContent !== '') {
                            description.focus()
                            setElementNav('.description');
                            player.classList.remove('video-style__active')
                        }
                    }
                    catch { }
                }
                else if (e.keyCode === 13) {
                    document.querySelector('.vjs-fullscreen-control').click()
                    if (fullScreen === false) {
                        setFullScreen(true)
                    }
                    else {
                        setFullScreen(false)
                    }
                }
                else if (e.keyCode === 461 || e.keyCode === 8) {
                    if (fullScreen === true) {
                        document.querySelector('.vjs-fullscreen-control').click()
                        setFullScreen(false)
                    }
                    else {
                        document.querySelector('.header__icon_exit').click();
                    }
                }
                else if (e.keyCode === 39 && fullScreen === false) {
                    if (processedProgData.length !== 0) {
                        setElementNav('.programs');
                        let programsList = document.querySelector('.programs__list');
                        setProgramElemList(programsList.querySelectorAll('.program'));
                        try {
                            programElemList[programIndexElem].focus()
                        }
                        catch {
                            document.querySelector('.program_active').focus();
                        }
                        player.classList.remove('video-style__active')
                    }
                }
            }
            // Description nav
            else if (elementNav === ".description") {
                if (e.keyCode === 38) {
                    setElementNav('.player');
                    document.getElementById('video').focus();
                }
                else if (e.keyCode === 461 || e.keyCode === 8) {
                    document.querySelector('.header__icon_exit').click();
                }
            }
            // PROGRAM NAV
            else if (elementNav === ".programs") {
                setEndIndex(processedProgData.length)
                let programsList = document.querySelector('.programs');
                if (e.keyCode === 37) {
                    setElementNav('.player');
                    document.getElementById('video').focus();
                }
                else if (e.keyCode === 40 && programIndexElem !== endIndex - 1) {
                    programIndexElem = programElemIndex + 1;
                    programElemList[programIndexElem].focus()
                    setProgramElemIndex(programIndexElem)
                    // SCROLL POSITION
                    setScrollYProgram('')
                    if (scrollYProgram === 'end') {
                        programElemList[programIndexElem].scrollIntoView(false)
                        programsList.scrollBy({ top: +6 })
                    }
                    let scroll = programElemList[programIndexElem].getBoundingClientRect();
                    if (scroll.y > window.screen.height - 205) {
                        setScrollYProgram('end')
                    }
                }
                else if (e.keyCode === 38 && programElemIndex !== 0) {
                    programIndexElem = programElemIndex - 1;
                    programElemList[programIndexElem].focus()
                    setProgramElemIndex(programIndexElem)
                    // SCROLL POSITION
                    setScrollYProgram('')
                    if (scrollYProgram === 'start') {
                        programElemList[programIndexElem].scrollIntoView(true)
                        programsList.scrollBy({ top: -6 })

                    }
                    let scroll = programElemList[programIndexElem].getBoundingClientRect();
                    if (scroll.y < 172) {
                        setScrollYProgram('start')
                    }
                }
                else if (e.keyCode === 461 || e.keyCode === 8) {
                    document.querySelector('.header__icon_exit').click()
                }
            }
        }
        // EXIT POPUP OPEN
        else {
            document.getElementById(exitPopupElem).focus()
            if (e.keyCode === 461 || e.keyCode === 8) {
                document.getElementById('exit-popup__no').click();
                document.getElementById('exit-popup__no').classList.add('open__focus');
                setExitPopupElement('exit-popup__no');
                console.log(elementNav, elementIndex);
                if (elementNav === ".channels") {
                    channelsElemList[elementIndex].focus();
                }
                else if (elementNav === ".groups") {
                    channelsGroupsElement.focus();
                }
                else if (elementNav === ".description") {
                    document.querySelector('.livetv__description').focus();
                }
                else if (elementNav === ".programs") {
                    document.querySelector('.program_active').focus();
                }
            }
            else if (e.keyCode === 39 && exitPopupElem !== 'exit-popup__yes') {
                document.getElementById('exit-popup__yes').focus();
                setExitPopupElement('exit-popup__yes');
                document.getElementById('exit-popup__no').classList.remove('open__focus');
            }
            else if (e.keyCode === 37 && exitPopupElem !== 'exit-popup__no') {
                document.getElementById('exit-popup__no').focus();
                setExitPopupElement('exit-popup__no');
            }
            else if (e.keyCode === 13) {
                document.activeElement.click()
                document.getElementById('exit-popup__no').classList.add('open__focus');
            }
        }
    }, [exitPopupElement, isExitPopupOpen, programElemIndex, fullScreen, navigate, activeGroupIndex, elementIndex, elementNav, endIndex, headerElemList, channelsElemList, channelsGroupsElement])

    // HANDLE CLICK MOUSE OUTSIDE
    const handleClickOutside = useCallback((e) => {
        let indexElem = 0;
        let indexGroup = activeGroupIndex;
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
        else if (elementClassName === 'right_arrow') {
            console.log(elementClassName);
            setElementNav('.groups')
            if (activeGroupIndex !== groupsList().length - 1) {
                indexGroup = activeGroupIndex + 1
                setActiveGroupIndex(indexGroup)
                setActiveGroup(groupsList()[indexGroup])
            }
            else {
                indexGroup = 0;
                setActiveGroupIndex(indexGroup)
                setActiveGroup(groupsList()[indexGroup])
            }
        }
        else if (elementClassName === 'left_arrow') {
            console.log(elementClassName);
            setElementNav('.groups')
            if (activeGroupIndex !== 0) {
                indexGroup = activeGroupIndex - 1
                setActiveGroupIndex(indexGroup)
                setActiveGroup(groupsList()[indexGroup])
            }
            else {
                indexGroup = groupsList().length - 1;
                setActiveGroupIndex(indexGroup)
                setActiveGroup(groupsList()[indexGroup])
            }
        }

    }, [headerElemList, channelsElemList]);

    // ADD & REMOVE LISTENER
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleKeyPress, handleClickOutside]);

    // LIVE TV LIST & ACTIVE GROUP
    useEffect(() => {
        if (liveTvList.length !== 0) {
            const header = document.querySelector('.header');
            setHeaderElemList(header.querySelectorAll('a'));
            const channels = document.querySelector('.channels__list');
            setChannelsElemList(channels.querySelectorAll('li'));
        }
    }, [activeGroup, liveTvList])

    // SELECT (header, channels) element for navigation
    useEffect(() => {
        const header = document.querySelector('.header');
        setHeaderElemList(header.querySelectorAll('a'));
        if (liveTvList.length !== 0) {
            const channels = document.querySelector('.channels__list');
            setChannelsElemList(channels.querySelectorAll('li'));
            if (channels.querySelectorAll('li').length !== 0) {
                const activeChannel = channels.querySelectorAll('li')[0]
                activeChannel.click();
                activeChannel.focus();
                setElementNav('.channels')
                setEndIndex(channels.querySelectorAll('li').length)
            }
        }
        else {
            header.querySelectorAll('a')[0].focus();
            setElementNav('.header')
        }
    }, [liveTvList]);

    // live TV GROUPS
    const groupsList = () => {
        let groups = ["All"]
        content.forEach(stream => {
            stream.groups.forEach(group => {
                groups.push(group)
            })
        });
        return groups.filter((item, i, ar) => ar.indexOf(item) === i)
    };

    // CHECK TOKEN 
    function checkToken(id) {
        const jwt = localStorage.getItem('jwt_CrocOtt');
        mainApi.checkToken(jwt)
            .then((res) => {
                if (res) {
                    mainApi.getTvPrograms(id)
                        .then((res) => {
                            setTvProgram(res.data.epg)
                        })
                }
            })
            .catch((err) => {
                console.log(err.error);
                refreshToken(id);
            })
    }

    // UPDATE PROGRAM DATA
    function updateProgramData() {
        const programs = processingProgramData(tvProgram)
        setProcessedProgData(programs)
        setProgramDesc('')
        setProgramTitle('')
        try {
            programs.forEach(prog => {
                if (prog.active === true) {
                    let actualProgramIndex = programs.indexOf(prog);
                    setProgramElemIndex(actualProgramIndex)
                    setProgramDesc(programs[actualProgramIndex].desc)
                    setProgramTitle(programs[actualProgramIndex].title)
                    setTimeout(function () { setActiveProgram(); }, programs[actualProgramIndex].timeout * 1000);
                    setScrollYProgram('start')
                    setScrollToActualProg(true)
                }
            })
        }
        catch {
            setScrollToActualProg(true)
        }
    }

    // SET ACTIVE PROGRAM
    function setActiveProgram() {
        updateProgramData()
    }

    // UPDATE TV PROGRAM
    useEffect(() => {
        updateProgramData()
    }, [tvProgram])

    // REFRESH TOKEN
    function refreshToken(id) {
        const refresh_token = localStorage.getItem('jwt_refresh_CrocOtt');
        const authorizationBasic = localStorage.getItem("Basic_authorization_CrocOtt");
        const authorizationCode = localStorage.getItem("Code_authorization_CrocOtt");
        try {
            if (authorizationBasic !== null && refresh_token !== null) {
                mainApi.refreshToken(authorizationBasic, refresh_token)
                    .then((res) => {
                        saveJwt(res)
                    })
                    .then(() => {
                        checkToken(id)
                    })
                    .catch((err) => {
                        console.log(err);
                        navigate('/signinlogin')
                    })
            }
            else if (authorizationCode !== null && refresh_token !== null) {
                mainApi.refreshToken(authorizationBasic, refresh_token)
                    .then((res) => {
                        saveJwt(res)
                    })
                    .then(() => {
                        checkToken(id)
                    })
                    .catch((err) => {
                        console.log(err);
                        navigate('/signinlogin')
                    })
            }
        }
        catch {
            navigate('/signinlogin')
        }

    }

    // GET PROGRAMS FOR CHANNEL
    function getTvPrograms(id) {
        checkToken(id)
    }

    // SROCLL TO ACTUAL PROGRAM
    useEffect(() => {
        try {
            let programsList = document.querySelector('.programs');
            document.getElementById('actual_program').scrollIntoView();
            programsList.scrollBy({ top: -6 })
        }
        catch { }
        setScrollToActualProg(false)
    }, [scrollToActualProg])

    // HANDLE CHANNEL CLICK
    function handleChannelClick(display_name, urls, id) {
        getTvPrograms(id)
        let programsList = document.querySelector('.programs__list');
        setProgramElemList(programsList.querySelectorAll('.program'));
        runPlayer(display_name, urls)
    }

    // RUN PLAYER
    function runPlayer(display_name, urls) {
        setLoading(true)
        setVideoData({
            "videoUrl": urls[0]["url"],
            "videoName": display_name,
            "width": window.innerWidth / 2 + 'px',
            "height": window.innerHeight / 1.8 + 'px'
        })
        if (Object.keys(videoData).length !== 0) {
            setUpdatePlayer(true)
        }
        else {
            console.log('false', videoData);
            setUpdatePlayer(false)
            setFirstRun(true)
        }
    }

    //DELETE OLD PLAYER
    function deletePlayer() {
        try {
            let player = document.getElementById('videoStream_html5_api');
            player.pause()
            eval(`videojs(player).dispose();`)
        }
        catch {
        }
    }

    // UPDATE PLAYER STATE
    useEffect(() => {
        if (statePlayer === true) {
            setUpdatePlayer(true)
        }
        setStatePlayer(true)
    }, [statePlayer])


    // FIRST RUN autoplay
    useEffect(() => {
        if (firstRun === true) {
            const channels = document.querySelector('.channels__list');
            const activeChannel = channels.querySelectorAll('li')[0]
            activeChannel.click();
        }
        else {
            deletePlayer()
        }
    }, [firstRun])


    return (
        <>
        {liveTvList.length !== 0 ?
        <main className="livetv">
            <TvChannelsList onClick={handleChannelClick} activeGroup={activeGroup} />
            <div>
                {loading &&
                    <div>{updatePlayer ?
                        <div>
                            <Player videoData={videoData} />
                            <h1 className="livetv__title" >{videoData.videoName}</h1>
                            <h2 className="livetv__program" >{programTitle}</h2>
                            <p className="livetv__description" tabIndex="0">{programDesc}</p>
                        </div>
                        : 'Plase click on channel'}</div>}
            </div>
            <TvProgramList tvProgram={processedProgData} />
        </main> 
        : 
        <EmptyContent emptyText='There are no LiveTv yet'/>
    }
        </>
    )
}

export default LiveTv;