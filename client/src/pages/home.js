import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import Feed from '../components/Feed/Feed';
import Sidebar from "../components/Sidebar/Sidebar";
import { getPosts } from '../redux/actions/posts';

export default function Home(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="app_body">
            <Feed />
            <Sidebar/>
        </div>
    )
}