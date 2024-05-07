import { React, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './LiveTv.css';
import TvChannelsList from '../TvChannelsList/TvChannelsList';
import Player from '../Player/Player';
import TvProgramList from '../TvProgramList/TvProgramList';
import mainApi from '../../utils/MainApi';
import saveJwt from '../../utils/saveJwt';
import processingProgramData from '../../utils/processingProgData';

function LiveTv({ liveTvList }) {
    // PLAYER STATES
    const [videoData, setVideoData] = useState({})
    const [loading, setLoading] = useState(false);
    // LIVE TV GROUPS STATES
    const [activeGroup, setActiveGroup] = useState("All")
    const [activeGroupIndex, setActiveGroupIndex] = useState(0)
    // Live Tv program STATES
    const [tvProgram, setTvProgram] = useState([])
    const [processedProgData, setProcessedProgData] = useState('')
    const [programDesc, setProgramDesc] = useState('')
    const [programTitle, setProgramTitle] = useState('')
    const [programElemList, setProgramElemList] = useState('')
    // NAVIGATION STATES
    const navigate = useNavigate();
    const [elementIndex, setElementIndex] = useState(0);
    const [elementNav, setElementNav] = useState('');
    const [endIndex, setEndIndex] = useState(0);
    const [headerElemList, setHeaderElemList] = useState('');
    const [channelsElemList, setChannelsElemList] = useState('');
    const channelsGroupsElement = document.querySelector('.channels__item');
    const [fullScreen, setFullScreen] = useState(false)

    // HANDLE REMOTE CONTROL
    const handleKeyPress = useCallback((e) => {
        // INDEXES
        let indexGroup = activeGroupIndex
        let indexElem = elementIndex;
        //  HEADER NAV
        if (elementNav === ".header") {
            if (e.keyCode === 39) {
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
            if (e.keyCode === 39 && activeGroupIndex !== groupsList().length - 1) {
                indexGroup = activeGroupIndex + 1
                setActiveGroupIndex(indexGroup)
                setActiveGroup(groupsList()[indexGroup])
            }
            else if (e.keyCode === 37 && activeGroupIndex !== 0) {
                indexGroup = activeGroupIndex - 1
                setActiveGroupIndex(indexGroup)
                setActiveGroup(groupsList()[indexGroup])
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
            if (e.keyCode === 40 && indexElem !== endIndex - 1) {
                try {
                    indexElem = elementIndex + 1;
                    channelsElemList[indexElem].focus();
                    setElementIndex(indexElem)
                }
                catch { }
            }
            else if (e.keyCode === 38 && elementIndex !== 0) {
                indexElem = elementIndex - 1;
                channelsElemList[indexElem].focus();
                setElementIndex(indexElem)
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
                setElementNav('.player');
                document.getElementById('video').focus()
            }
        }
        // PLAYER NAV
        else if (elementNav === ".player") {
            document.getElementById('video').focus()
            if (e.keyCode === 37 && fullScreen === false) {
                setElementNav('.channels');
                channelsElemList[elementIndex].focus()
            }
            else if (e.keyCode === 38 && fullScreen === false) {
                setElementNav('.groups');
                setElementIndex(0)
                channelsGroupsElement.focus()
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
            else if (e.keyCode === 461 && fullScreen === true){
                document.querySelector('.vjs-fullscreen-control').click()
                setFullScreen(false)
            }

            else if (e.keyCode === 39) {
                if (processedProgData.length !== 0) {
                    setElementNav('.programs');
                    setElementIndex(0);
                    document.querySelector('.program_active').focus();
                    let programsList = document.querySelector('.programs__list');
                    setProgramElemList(programsList.querySelectorAll('.program'));
                }
            }
        }
        // PROGRAM NAV
        else if (elementNav === ".programs") {
            setEndIndex(processedProgData.length)
            if (e.keyCode === 37) {
                setElementNav('.player');
                setElementIndex(0);
                document.getElementById('video').focus();
            }
            else if (e.keyCode === 40 && indexElem !== endIndex - 1) {
                indexElem = elementIndex + 1;
                programElemList[indexElem].focus()
                setElementIndex(indexElem)
            }
            else if (e.keyCode === 38 && elementIndex !== 0) {
                indexElem = elementIndex - 1;
                programElemList[indexElem].focus()
                setElementIndex(indexElem)
            }
            else if (e.keyCode === 38 && elementIndex === 0) {
                setElementNav('.groups');
                setElementIndex(0)
                channelsGroupsElement.focus()
            }
        }
    }, [fullScreen, navigate, activeGroupIndex, elementIndex, elementNav, endIndex, headerElemList, channelsElemList, channelsGroupsElement])

    // HANDLE CLICK MOUSE OUTSIDE
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
            setProgramDesc(programs[0].desc)
            setProgramTitle(programs[0].title)
            setTimeout(function () { setActiveProgram(); }, programs[0].timeout * 1000);
        }
        catch { }
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


    function handleChannelClick(display_name, urls, id) {
        getTvPrograms(id)
        startPlayer(display_name, urls)
    }

    function startPlayer(display_name, urls) {
        setLoading(true)
        setVideoData({
            "videoUrl": urls[0]["url"],
            "videoName": display_name
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