import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import Feed from '../components/Feed/Feed';
import Sidebar from "../components/Sidebar/Sidebar";
import { getPosts } from '../redux/actions/posts';
import { CHANGE_POSTS_TYPE } from '../redux/constants';

export default function Home(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
        dispatch({ type: CHANGE_POSTS_TYPE, mode: 'hot' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="app_body">
            <Feed />
            <Sidebar/>
        </div>
    )
}