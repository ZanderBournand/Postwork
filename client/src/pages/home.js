import React from 'react'
import Feed from '../components/Feed/Feed';
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home(){
    return(
        <div className="app_body">
            <Feed />
            <Sidebar/>
        </div>
    )
}