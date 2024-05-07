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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // состояние авторизации пользователя
  const [apiError, setApiError] = useState(''); //Ошибка от сервера
  const [token, setToken] = useState('')

  // CONTENT
  const [logo, setLogo] = useState('https://ott.crocott.com/panel_pro/api/runtime_folder/static/6629d363418e8b5418d68f8a.png')
  const [liveTvList, setLiveTvList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [serialsList, setSerialsList] = useState([]);



  // Check Token
  useEffect(() => {
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

  function getInfo() {
    mainApi.getInfo()
      .then((res) => {
        setLogo(res.data.brand.logo)
      })
  }


  // TESTING
  function getContentFull() {
    mainApi.getFullContent()
      .then((res) => {
        if (res) {
          localStorage.setItem('fullContent_crocOTT', JSON.stringify(res));
          parseFullContent()
        }
      })
      .catch((err) => {
        console.log(err);
      })



    // parseFullContent()
  }

  function parseFullContent() {
    const content = JSON.parse(localStorage.getItem('fullContent_crocOTT'));
    const streams = [];
    const movies = [];
    const serials = [];
    content.data.packages.forEach(packag => {
      if (packag.streams.length !== 0) {
        packag.streams.forEach(stream => {
          streams.push(stream)
        });
      }
      else if (packag.vods.length !== 0) {
        packag.vods.forEach(vod => {
          movies.push(vod)
        });
      }
      else if (packag.serials.length !== 0) {
        packag.serials.forEach(serial => {
          serials.push(serial)
        });
      }
    })
    localStorage.setItem('streams_crocOTT', JSON.stringify(streams))
    setLiveTvList(JSON.parse(localStorage.getItem('streams_crocOTT')))
    localStorage.setItem('movies_crocOTT', JSON.stringify(movies))
    setMoviesList(JSON.parse(localStorage.getItem('movies_crocOTT')))

    localStorage.setItem('serials_crocOTT', JSON.stringify(serials))
  }

  // HANDLE BTN LOGIN 
  function handleLogin(values) {
    const authorization = mainApi.createHeaders(values.name, values.password);
    localStorage.setItem("Basic_authorization_CrocOtt", authorization);
    login(authorization);
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
    let deviceId = ''
    let dataForLogin = JSON.parse(localStorage.getItem("deviceData_Crocott"))
    mainApi.getListDevices(authorization)
      .then((res) => {
      })
      .then(() => {
        mainApi.addDevice(authorization, dataForLogin.os.arch)
          .then((res) => {
            deviceId = res.data.device.id;
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
        setApiError(err.error.message)
      })
  }

  // LOGOUT
  function handleLogOut() {
    navigate('/signinlogin');
    setIsLoggedIn(false);
    localStorage.removeItem('jwt_CrocOtt');
    localStorage.removeItem('jwt_refresh_CrocOtt')
    localStorage.removeItem("Basic_authorization_CrocOtt")
    localStorage.removeItem("Code_authorization_CrocOtt")
    localStorage.removeItem('fullContent_crocOTT');
    localStorage.removeItem('streams_crocOTT')
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
