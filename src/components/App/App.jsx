import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import LiveTv from '../LiveTv/LiveTv';
import Movies from '../Movies/Movies';
import Serials from '../Serials/Serials';
import Packages from '../Packages/Packages';
import Settings from '../Settings/Settings';
import SignInCode from '../SignInCode/SignInCode';
import SignInLogin from '../SignInLogin/SignInLogin';
import ExitPopup from '../ExitPopup/ExitPopup';
import mainApi from '../../utils/MainApi';
import saveJwt from '../../utils/saveJwt';
import { parseStreams, parseVods, parseSerials } from '../../utils/parseContent';


function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiError, setApiError] = useState('');
  const [token, setToken] = useState('');
  const [logo, setLogo] = useState('https://ott.crocott.com/panel_pro/api/runtime_folder/static/6629d363418e8b5418d68f8a.png');
  const [liveTvList, setLiveTvList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  // const [serialsList, setSerialsList] = useState([]);
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);

  // Check Token
  useEffect(() => {
    const jwt = localStorage.getItem('jwt_CrocOtt');
    if (jwt === null) {
      navigate('/signinlogin')
    }
    else {
      // checkToken(jwt)
      navigate('/')
      getInfo();
    }
  }, [token])

  // Check Token
  function checkToken(jwt) {
    setLoading(true);
    mainApi.checkToken(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true)
          getContentFull();
          navigate('/livetv')
        }
      })
      .catch((err) => {
        console.log(err.error);
        refreshToken();
      })
      .finally(() => {
        setLoading(false);
      })
  }

  // Refresh Token
  function refreshToken() {
    const refresh_token = localStorage.getItem('jwt_refresh_CrocOtt');
    const authorizationBasic = localStorage.getItem("Basic_authorization_CrocOtt");
    const authorizationCode = localStorage.getItem("Code_authorization_CrocOtt");
    try {
      if (authorizationBasic !== null && refresh_token !== null) {
        mainApi.refreshToken(authorizationBasic, refresh_token)
          .then((res) => {
            saveJwt(res)
            setToken(res.data.access_token)
          })
          .catch((err) => {
            console.log(err);
            navigate('/signinlogin')
          })
      }
      else if (authorizationCode !== null && refresh_token !== null) {
        mainApi.refreshToken(authorizationCode, refresh_token)
          .then((res) => {
            saveJwt(res)
            setToken(res.data.access_token)
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

  // Get LOGO (get info)
  function getInfo() {
    mainApi.getInfo()
      .then((res) => {
        setLogo(res.data.brand.logo)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Get Full Content
  function getContentFull() {
    mainApi.getFullContent()
      .then((res) => {
        if (res) {
          setLiveTvList(parseStreams(res));
          setMoviesList(parseVods(res));
          parseSerials(res);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // HANDLE URL
  function handleUrl(url) {
    if (localStorage.getItem('url_CrocOtt') === null) {
      if (url) {
        localStorage.setItem('url_CrocOtt', url)
      }
      else {
        localStorage.setItem('url_CrocOtt', 'https://ott.crocott.com')
      }
    }
    else {
      console.log(localStorage.getItem('url_CrocOtt'));
    }
  }

  // HANDLE BTN LOGIN 
  function handleLogin(values) {
    handleUrl(values.url);
    mainApi.getInfo()
      .then((res) => {
        const authorization = mainApi.createHeaders(values.name, values.password);
        localStorage.setItem("Basic_authorization_CrocOtt", authorization);
        login(authorization);
      })
      .catch((err) => {
        localStorage.removeItem('url_CrocOtt');
        setApiError(err.toString());
      })
  };

  // HANDLE BTN LOGIN  WITH CODE
  function handleLoginCode(values) {
    handleUrl(values.url);
    mainApi.getInfo()
      .then((res) => {
        const authorization = mainApi.createHeadersWithCode(values.code);
        localStorage.setItem("Code_authorization_CrocOtt", authorization);
        login(authorization);
      })
      .catch((err) => {
        setApiError(err.toString());
      })
  }

  // LOGIN 
  function login(authorization) {
    let deviceId = JSON.parse(localStorage.getItem('deviceId_Crocott'));
    let dataForLogin = JSON.parse(localStorage.getItem("deviceData_Crocott"))
    // Login without add deviceId
    if (deviceId !== null) {
      dataForLogin.id = deviceId;
      mainApi.login(authorization, dataForLogin)
        .then((res) => {
          saveJwt(res);
          getInfo();
          getContentFull();
          setIsLoggedIn(true);
          navigate('/livetv');
        })
        .catch((err) => {
          console.log(err);
          if (err.error.message === 'wrong login or password') {
            setApiError('Wrong login or password');
          } else if (err.error.message === 'wrong code') {
            setApiError('Wrong code');
          } else if (err.error.message === 'client or device not found') {
            localStorage.removeItem('deviceId_Crocott');
          }
          else {
            setApiError(err.error.message);
            localStorage.removeItem('url_CrocOtt');
            localStorage.removeItem('deviceId_Crocott');
          }
        })
    }
    else {
      // Login with add deviceId
      mainApi.getListDevices(authorization)
        .then((res) => {
        })
        .then(() => {
          mainApi.addDevice(authorization, dataForLogin.os.arch)
            .then((res) => {
              deviceId = res.data.device.id;
              localStorage.setItem("deviceId_Crocott", JSON.stringify(deviceId))
            })
            .then(() => {
              dataForLogin.id = deviceId;
              mainApi.login(authorization, dataForLogin)
                .then((res) => {
                  saveJwt(res);
                  getInfo();
                  getContentFull();
                  setIsLoggedIn(true)
                  navigate('/livetv');
                })
            })
        })
        .catch((err) => {
          if (err.error.message === 'wrong login or password') {
            setApiError('Wrong login or password');
          } else if (err.error.message === 'wrong code') {
            setApiError('Wrong code');
          }
          else {
            setApiError(err.error.message);
          }
        })
    }
  }

  // OPEN EXIT POPUP
  function handleOpenExitPopup() {
    setIsExitPopupOpen(true);
  }

  // CLOSE EXIT POPUP
  function handleCloseExitPopup() {
    setIsExitPopupOpen(false);
  }

  // LOGOUT
  function handleLogOut() {
    setIsExitPopupOpen(false);
    navigate('/signinlogin');
    setIsLoggedIn(false);
    setApiError('');
    localStorage.removeItem('streams_crocOTT');
    localStorage.removeItem('movies_crocOTT');
    // webOS.platformBack();
  }


  return (
    <div className="page">
      {loading && <Preloader />}
      <Routes>
        <Route path="/livetv" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleOpenExitPopup} logo={logo} />
            <LiveTv liveTvList={liveTvList} isExitPopupOpen={isExitPopupOpen} />
          </ProtectedRoute>
        }
        />
        <Route path="/movies" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleOpenExitPopup} logo={logo} />
            <Movies moviesList={moviesList} isExitPopupOpen={isExitPopupOpen} />
          </ProtectedRoute>
        }
        />
        <Route path="/series" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleOpenExitPopup} logo={logo} />
            <Serials />
          </ProtectedRoute>
        }
        />
        <Route path="/packages" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleOpenExitPopup} logo={logo} />
            <Packages />
          </ProtectedRoute>
        }
        />
        <Route path="/settings" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleOpenExitPopup} logo={logo} />
            <Settings />
          </ProtectedRoute>
        }
        />
        <Route path="/signincode" element={isLoggedIn ? <Navigate to="/livetv" replace /> : <SignInCode onLoginCode={handleLoginCode} errorMessage={apiError} onExit={handleOpenExitPopup} isExitPopupOpen={isExitPopupOpen} />} />
        <Route path="/signinlogin" element={isLoggedIn ? <Navigate to="/livetv" replace /> : <SignInLogin onLogin={handleLogin} errorMessage={apiError}  onExit={handleOpenExitPopup} isExitPopupOpen={isExitPopupOpen} />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/livetv" replace /> : <SignInLogin onLogin={handleLogin} errorMessage={apiError} onExit={handleOpenExitPopup} isExitPopupOpen={isExitPopupOpen} />} />
      </Routes>
      <ExitPopup isOpen={isExitPopupOpen} isNotExit={handleCloseExitPopup} isExit={handleLogOut} />
    </div>
  );
}

export default App;