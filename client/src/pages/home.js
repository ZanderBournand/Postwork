import React from 'react'
import { useSelector } from 'react-redux';
import Feed from '../components/Feed/Feed';
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home(){

    const currentUser = useSelector((state) => state.auth);
    return(
        <div className="app_body">
            <Feed />
            <Sidebar/>
        </div>
    )
}