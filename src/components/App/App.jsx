import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import LiveTv from '../LiveTv/LiveTv';
import Movies from '../Movies/Movies';
import SignInCode from '../SignInCode/SignInCode';
import SignInLogin from '../SignInLogin/SignInLogin';
import mainApi from '../../utils/MainApi';
import saveJwt from '../../utils/saveJwt';


function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiError, setApiError] = useState('');
  const [token, setToken] = useState('');
  const [logo, setLogo] = useState('https://ott.crocott.com/panel_pro/api/runtime_folder/static/6629d363418e8b5418d68f8a.png');
  const [liveTvList, setLiveTvList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  // const [serialsList, setSerialsList] = useState([]);

  // Check Token
  useEffect(() => {

    // localStorage.removeItem('url_CrocOtt')

    const jwt = localStorage.getItem('jwt_CrocOtt');
    if (jwt === null) {
      navigate('/signinlogin')
    }
    else {
      checkToken(jwt)
    }
  }, [token])

  // Check Token
  function checkToken(jwt) {
    mainApi.checkToken(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true)
          getContentFull();
          navigate('/test_main')
        }
      })
      .catch((err) => {
        console.log(err.error);
        refreshToken();
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
  }

  // Get Full Content
  function getContentFull() {
    mainApi.getFullContent()
      .then((res) => {
        if (res) {
          parseFullContent(res)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Parse Full Content
  function parseFullContent(res) {
    const content = res
    const streams = [];
    const movies = { 'data': {} };
    const vodsList = [];
    movies.data = { "packages": [] }
    const serials = [];
    // parse
    content.data.packages.forEach(packag => {
      // create streams
      if (packag.streams.length !== 0) {
        packag.streams.forEach(stream => {
          streams.push(stream)
        });
      }
      // create movies
      else if (packag.vods.length !== 0) {
        movies.data.packages.push(packag)
        // create vodsList
        packag.vods.forEach(vod => {
          vodsList.push(vod)
        });
      }
      // create serials
      else if (packag.serials.length !== 0) {
        packag.serials.forEach(serial => {
          serials.push(serial)
        });
      }
    })
    // Save streams, movies, serials in localStorege
    localStorage.setItem('streams_crocOTT', JSON.stringify(streams))
    setLiveTvList(JSON.parse(localStorage.getItem('streams_crocOTT')))
    localStorage.setItem('movies_crocOTT', JSON.stringify(movies))
    setMoviesList(vodsList)
    localStorage.setItem('serials_crocOTT', JSON.stringify(serials))
  }

  // HANDLE BTN LOGIN 
  function handleLogin(values) {
    console.log(values);
    if (localStorage.getItem('url_CrocOtt') === null) {
      if (values.url) {
        localStorage.setItem('url_CrocOtt', values.url)
      }
      else {
        localStorage.setItem('url_CrocOtt', 'https://ott.crocott.com')
      }
    }
    else {
      console.log("NOT NULL");
    }
    mainApi.getInfo()
      .then((res) => {
        // console.log(res);
        const authorization = mainApi.createHeaders(values.name, values.password);
        localStorage.setItem("Basic_authorization_CrocOtt", authorization);
        login(authorization);
      })
      .catch((err) => {
        setApiError(err.toString());
      })
  };

  // HANDLE BTN LOGIN  WITH CODE
  function handleLoginCode(values) {
    const authorization = mainApi.createHeadersWithCode(values.code);
    localStorage.setItem("Code_authorization_CrocOtt", authorization);
    login(authorization);
    // setIsLoggedIn(true)
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
          navigate('/test_main');
        })
        .catch((err) => {
          console.log(err);
          if (err.error.message === 'wrong login or password') {
            setApiError('Wrong login or password');
          } else if (err.error.message === 'wrong code') {
            setApiError('Wrong code');
          }
          else {
            setApiError(err.error.message);
            localStorage.removeItem('url_CrocOtt')
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
                  navigate('/test_main');
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
            localStorage.removeItem('url_CrocOtt');
          }
        })
    }
  }

  // LOGOUT
  function handleLogOut() {
    navigate('/signinlogin');
    setIsLoggedIn(false);
    setApiError('');
    localStorage.removeItem('jwt_CrocOtt');
    localStorage.removeItem('jwt_refresh_CrocOtt');
    localStorage.removeItem("Basic_authorization_CrocOtt");
    localStorage.removeItem("Code_authorization_CrocOtt");
    localStorage.removeItem('streams_crocOTT');
    localStorage.removeItem('movies_crocOTT');
  }


  return (
    <div className="page">
      <Routes>
        <Route path="/test_main" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleLogOut} logo={logo} />
            <LiveTv liveTvList={liveTvList} />
          </ProtectedRoute>
        }
        />
        <Route path="/movies" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleLogOut} logo={logo} />
            <Movies moviesList={moviesList} />
          </ProtectedRoute>
        }
        />
        <Route path="/series" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleLogOut} logo={logo} />
            <h2>SERIES</h2>
          </ProtectedRoute>
        }
        />
        <Route path="/packages" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleLogOut} logo={logo} />
            <h2>PACKAGES</h2>
          </ProtectedRoute>
        }
        />
        <Route path="/settings" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleLogOut} logo={logo} />
            <h2>SETTINGS</h2>
          </ProtectedRoute>
        }
        />
        <Route path="/signincode" element={isLoggedIn ? <Navigate to="/test_main" replace /> : <SignInCode onLoginCode={handleLoginCode} errorMessage={apiError} />} />
        <Route path="/signinlogin" element={isLoggedIn ? <Navigate to="/test_main" replace /> : <SignInLogin onLogin={handleLogin} errorMessage={apiError} />} />
      </Routes>
    </div>
  );
}

export default App;
