import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SignInCode from '../SignInCode/SignInCode';
import SignInLogin from '../SignInLogin/SignInLogin';
import mainApi from '../../utils/MainApi';



function App() {
  // localStorage.removeItem('jwt_CrocOtt');
  const authorizationBasic = localStorage.getItem("Basic_authorization_CrocOtt");
  const authorizationCode = localStorage.getItem("Code_authorization_CrocOtt");

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // состояние авторизации пользователя
  const [apiError, setApiError] = useState(''); //Ошибка от сервера


  // const [nowLocation, setNowLocation] = useState(''); // Текущая локация


  // Check Token
  useEffect(() => {
    localStorage.setItem("deviceName_crocOTT", "LG TESTING")
    localStorage.setItem("deviceVersion_crocOTT", "02.08.09")
    localStorage.setItem("deviceDdrSize_crocOTT", "2")

    const jwt = localStorage.getItem('jwt_CrocOtt');
    if (jwt === null) {
      navigate('/signinlogin')
    }
    else {
      checkToken(jwt)
    }
  }, [])


  // Check Token
  function checkToken(jwt) {
    const refresh_token = localStorage.getItem('jwt_refresh_CrocOtt');
    mainApi.checkToken(jwt)
      .then((res) => {
        if (res) {
          getContentFull();
          setIsLoggedIn(true)
          navigate('/test_main')
        }
      })
      .catch((err) => {
        console.log(err.error);
        try {
          if (authorizationBasic !== null && refresh_token !== null) {
            mainApi.refreshToken(authorizationBasic, refresh_token)
              .then((res) => { 
                saveJwt(res)
                navigate('/test_main')
              })
              .catch((err) =>{
                console.log(err);
                navigate('/signinlogin')
              })
          }
          else if (authorizationCode !== null && refresh_token !== null) {
            mainApi.refreshToken(authorizationCode, refresh_token)
              .then((res) => { 
                saveJwt(res)
                navigate('/test_main') 
              })
              .catch((err) =>{
                console.log(err);
                navigate('/signinlogin')
              })
          }
        }
        catch {
          navigate('/signinlogin')
        }
      })
  }


   // TESTING
   function getContentFull() {
    mainApi.getFullContent()
      .then((res) => {
        if (res) {

          localStorage.setItem('fullContent_crocOTT', JSON.stringify(res));
          const content = JSON.parse(localStorage.getItem('fullContent_crocOTT'));
    createContent(content)
          // console.log(JSON.parse(localStorage.getItem('fullContent_crocOTT')));
        }

      })


    createContent()
  }

  function createContent() {
    const content = JSON.parse(localStorage.getItem('fullContent_crocOTT'));
    const streams = [];
    const moviaes = [];
    const serials = [];
    content.data.packages.forEach(packag => {
      if (packag.streams.length !== 0) {
        packag.streams.forEach(stream => {
          streams.push(stream)
        });
      }
      else if (packag.vods.length !== 0) {
        packag.vods.forEach(vod => {
          moviaes.push(vod)
        });
      }
      else if (packag.serials.length !== 0) {
        packag.serials.forEach(serial => {
          serials.push(serial)
        });
      }
    })
    localStorage.setItem('streams_crocOTT', JSON.stringify(streams))
    localStorage.setItem('moviaes_crocOTT', JSON.stringify(moviaes))
    localStorage.setItem('serials_crocOTT', JSON.stringify(serials))
  }













  // Обработчик входа в приложение
  function handleLogin(values) {
    const authorization = mainApi.createHeaders(values.name, values.password);
    localStorage.setItem("Basic_authorization_CrocOtt", authorization)
    let deviceId = ''
    // console.log(authorization);
    mainApi.getListDevices(authorization)
      .then((res) => {
        console.log("list Device");
        console.log(res);
      })
      .then(() => {
        console.log("add Device");
        mainApi.addDevice(authorization, localStorage.getItem("deviceName_crocOTT"))
          .then((res) => {
            console.log(res);
            deviceId = res.data.device.id;
          })
          // CATCH
          .then(() => {
            // TESTING////////////////////////
            const dataForLogin = {
              "project": {
                "name": "CrocOTT",
                "version": "1.4.6"
              },
              "os": {
                "name": "webos",
                "version": localStorage.getItem("deviceVersion_crocOTT"),
                "ram_free": 0
              },
              "cpu_brand": "Lg"
            }
            dataForLogin.os.arch = localStorage.getItem("deviceName_crocOTT");
            dataForLogin.id = deviceId;
            dataForLogin.os.ram_total = Number(localStorage.getItem("deviceDdrSize_crocOTT"));
            console.log(dataForLogin);

            mainApi.login(authorization, dataForLogin)
              .then((res) => {
                saveJwt(res);
                // localStorage.setItem('jwt_CrocOtt', res.data.access_token)
                setIsLoggedIn(true)
                navigate('/test_main');
              })


            ///////////////////////////////////////
          })


      })
      .catch((err) => {
        setApiError(err.error.message)
      })
  };


  function handleLoginCode(values) {
    // localStorage.setItem("Code_authorization_CrocOtt", authorization)
    // setIsLoggedIn(true)
    // navigate('/test_main')
  }


  function saveJwt(res) {
    localStorage.setItem('jwt_CrocOtt', res.data.access_token)
    localStorage.setItem('jwt_refresh_CrocOtt', res.data.refresh_token)
  }


  function handleLogOut() {
    console.log("LOGOUT");
    navigate('/signinlogin');
    setIsLoggedIn(false);
    localStorage.removeItem('jwt_CrocOtt');
    localStorage.removeItem('jwt_refresh_CrocOtt')
    localStorage.removeItem("Basic_authorization_CrocOtt")
    localStorage.removeItem("Code_authorization_CrocOtt")
  }


  return (
    <div className="page">
      <Routes>
        <Route path="/test_main" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleLogOut} />
            <Main />
          </ProtectedRoute>
        }
        />
        <Route path="/movies" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleLogOut} />
            <h2>MOVIES</h2>
          </ProtectedRoute>
        }
        />
        <Route path="/series" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleLogOut} />
            <h2>SERIES</h2>
          </ProtectedRoute>
        }
        />
        <Route path="/packages" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleLogOut} />
            <h2>PACKAGES</h2>
          </ProtectedRoute>
        }
        />
        <Route path="/settings" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Header onExit={handleLogOut} />
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
