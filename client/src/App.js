import React, {useState, useEffect} from "react";
import "./App.css";
import Header from './components/Header/Header'
import Login from "./components/Login/Login";
import Home from "./pages/home"
import {useDispatch, useSelector} from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Bookmarks from "./pages/bookmarks";
import Profile from "./pages/profile";
import { LOGIN } from "./redux/constants";
import { getPosts } from "./redux/actions/posts";

function App() {

  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const cachedUser = JSON.parse(localStorage.getItem('profile'))
    if (cachedUser?.result != null) {
      dispatch({ type: LOGIN, data: cachedUser });
      dispatch(getPosts())
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
