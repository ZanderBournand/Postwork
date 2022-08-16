import React, {useState, useEffect, useInsertionEffect} from "react";
import "./App.css";
import Header from './components/Header/Header'
import Login from "./components/Login/Login";
import Home from "./pages/home"
import {login, selectUser} from "./features/userSlice"
import {useDispatch, useSelector} from "react-redux";
import { auth } from "./firebase";
import { logout } from "./features/userSlice";
import BeatLoader from "react-spinners/BeatLoader";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import Bookmarks from "./pages/bookmarks";
import Profile from "./pages/profile";
import { getUserById } from "./services/user";
import { LOGIN } from "./redux/constants";

function App() {

  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false)

  // useEffect(() =>{
  //   auth.onAuthStateChanged(userAuth => {
  //     if (userAuth) {
  //       getUserById(userAuth.uid) .then((res) => {
  //         dispatch(login(res))
  //         setLoaded(true)
  //       })
  //     } else{
  //       //user is logged out
  //       dispatch(logout());
  //       setLoaded(true)
  //     }
  //   })
  // }, []);

  useEffect(() => {
    const cachedUser = JSON.parse(localStorage.getItem('profile'))
    if (cachedUser?.result != null) {
      dispatch({ type: LOGIN, data: cachedUser });
    }
    setLoaded(true)
  }, [loaded])

  return (
    <Router>
    <div classsName="app">
      {!loaded ? 
        <div className="appLoader">
          <BeatLoader size={20} color='gray' loading={loaded}/>
        </div>
        :
        <>
          <Header/>
          <Routes>
            <Route path="/" element={(!currentUser) ? <Navigate to="/auth" replace={true}/> : <Navigate to="/feed" replace={true}/>}/>
            <Route path="/feed" element={<Home />}/>
            <Route path="/auth" element={(!currentUser) ? <Login /> : <Navigate to="/" replace={true}/>}/>
            <Route path="/bookmarks" element={<Bookmarks/>}/>
            <Route path="/profile/:username" element={<Profile/>}/>
          </Routes>
        </>
      }
    </div>
    </Router>
  );
}

export default App;
