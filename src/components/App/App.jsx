import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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


  const nameDevice = localStorage.getItem('deviceInfo_crocOTT')
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useState(true);
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
    mainApi.checkToken(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true)
          navigate('/test_main')
        }
      })
      .catch((err) => {
        console.log(err.error);
        try {
          const refresh_token = localStorage.getItem('jwt_refresh_CrocOtt');
          if (authorizationBasic !== null) {
            mainApi.refreshToken(authorizationBasic, refresh_token)
              .then((res) => { saveJwt(res) })
          }
          else if (authorizationCode !== null) {
            mainApi.refreshToken(authorizationCode, refresh_token)
              .then((res) => { saveJwt(res) })
          }
        }
        catch {
          navigate('/signinlogin')
        }
      })
  }



  // useEffect(() => {
  //   // localStorage.removeItem("jwtCrocOtt")


  //   if (localStorage.getItem("jwtCrocOtt") === null) {
  //     console.log(localStorage.getItem("jwtCrocOtt"));
  //     navigate('/signincode')
  //     setAuth(false)
  //     // if (location.pathname === '/signinlogin') {
  //     //   navigate('/signincode')
  //     // } else if (location.pathname === '/signincode') {
  //     //   navigate('/signinlogin')
  //     // } else{
  //     //   setIsLoggedIn(true)
  //     //   navigate('/test_main')
  //     // }

  //   }
  //   else {
  //     setIsLoggedIn(true)
  //     navigate('/test_main')
  //   }
  // }, [auth])


  // Check Token
  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt_CrocOtt');
  //   // const path = location.pathname;
  //   if (jwt) {
  //     // setLoading(true);
  //     mainApi.checkToken(jwt)
  //       .then((res) => {
  //         if (res) {
  //           setIsLoggedIn(true);
  //           navigate('/test_main')
  //           // navigate(path, { replace: true });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => {
  //         // setLoading(false);
  //       })
  //   }
  // }, []);


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
                localStorage.setItem('jwt_CrocOtt', res.data.access_token)
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

  // function handleLogin(values) {
  //   console.log(values)
  //   // document.getElementById("test").textContent = values.name + values.password + values.url;

  //   localStorage.setItem("jwtCrocOtt", values.name + values.password + values.url)
  //   navigate('/test_main');
  // }

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
