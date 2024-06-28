import { React, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './LiveTv.css';
import TvChannelsList from '../TvChannelsList/TvChannelsList';
import Player from '../Player/Player';
import TvProgramList from '../TvProgramList/TvProgramList';
import mainApi from '../../utils/MainApi';
import saveJwt from '../../utils/saveJwt';
import processingProgramData from '../../utils/processingProgData';

function LiveTv({ liveTvList, isExitPopupOpen }) {
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

    // HANDLE REMOTE CONTROL
    const handleKeyPress = useCallback((e) => {
        e.preventDefault();
        // INDEXES
        let indexGroup = activeGroupIndex
        let indexElem = elementIndex;
        let programIndexElem = programElemIndex;

        if (isExitPopupOpen !== true) {
            console.log('TEST');
            console.log(isExitPopupOpen);
            //  HEADER NAV
            if (elementNav === ".header") {
                if (e.keyCode === 39) {
                    const oldPlayer = document.getElementById('videoStream');
                    if (oldPlayer !== null) {
                        oldPlayer.remove();
                    }
                    document.activeElement.blur();
                    navigate('/movies')
                }
                else if (e.keyCode === 40) {
                    setElementNav('.groups');
                    setElementIndex(0)
                    channelsGroupsElement.focus()
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
            }
            // PLAYER NAV
            else if (elementNav === ".player") {
                let player = document.getElementById('video');
                player.classList.add('video-style__active')
                // document.getElementById('video').focus()

                if (e.keyCode === 37 && fullScreen === false) {
                    setElementNav('.channels');
                    channelsElemList[elementIndex].focus()
                    player.classList.remove('video-style__active')
                }
                else if (e.keyCode === 38 && fullScreen === false) {
                    setElementNav('.groups');
                    // setElementIndex(0)
                    channelsGroupsElement.focus()
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
                // else if (e.keyCode === 38 && programElemIndex === 0) {
                //     setElementNav('.groups');
                //     channelsGroupsElement.focus()
                // }
            }
        }

    }, [isExitPopupOpen, programElemIndex, fullScreen, navigate, activeGroupIndex, elementIndex, elementNav, endIndex, headerElemList, channelsElemList, channelsGroupsElement])

    // HANDLE CLICK MOUSE OUTSIDE
    const handleClickOutside = useCallback((e) => {
        // console.log(document.activeElement);
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

    useEffect(() => {
        updateProgramData()
    }, [tvProgram])

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

    function getTvPrograms(id) {
        checkToken(id)
    }

    useEffect(() => {
        try {
            let programsList = document.querySelector('.programs');
            document.getElementById('actual_program').scrollIntoView();
            programsList.scrollBy({ top: -6 })
        }
        catch { }
        setScrollToActualProg(false)
    }, [scrollToActualProg])

    function handleChannelClick(display_name, urls, id) {
        getTvPrograms(id)
        let programsList = document.querySelector('.programs__list');
        setProgramElemList(programsList.querySelectorAll('.program'));
        startPlayer(display_name, urls)
    }

    function startPlayer(display_name, urls) {
        setLoading(true)
        setVideoData({
            "videoUrl": urls[0]["url"],
            "videoName": display_name,
            "width": window.innerWidth / 2 + 'px',
            "height": window.innerHeight / 1.8 + 'px'
        })
    }

    return (
        <main className="livetv">
            <TvChannelsList onClick={handleChannelClick} activeGroup={activeGroup} />
            <div>
                {loading && <Player videoData={videoData} setVideoData={setVideoData} />}
                <h1 className="livetv__title" >{videoData.videoName}</h1>
                <h2 className="livetv__program" >{programTitle}</h2>
                <p className="livetv__description" tabIndex="0">{programDesc}</p>
            </div>
            <TvProgramList tvProgram={processedProgData} />
        </main>
    )
}

export default LiveTv;