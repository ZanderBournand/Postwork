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
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Bookmarks from "./pages/bookmarks";
import Profile from "./pages/profile";
import { getUserById } from "./services/user";

function App() {

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false)

  useEffect(() =>{
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        getUserById(userAuth.uid) .then((res) => {
          dispatch(login(res))
          setLoaded(true)
        })
      } else{
        //user is logged out
        dispatch(logout());
        setLoaded(true)
      }
    })
  }, []);

  return (
    <div classsName="app">
      {!loaded ? 
        <div className="appLoader">
          <BeatLoader size={20} color='gray' loading={loaded}/>
        </div>
        :
        <>
          <Router>
            <Header/>
            {!currentUser ? 
              <Login />
              :
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/bookmarks" element={<Bookmarks/>}/>
                <Route path="/profile/:username" element={<Profile/>}/>
              </Routes>
            }
          </Router>
        </>
      }
    </div>
  );
}

export default App;
