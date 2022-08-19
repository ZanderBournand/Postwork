import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import BookmarkFeed from '../components/Bookmarks/BookmarkFeed';
import { CHANGE_POSTS_TYPE } from '../redux/constants';

export default function Bookmarks(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: CHANGE_POSTS_TYPE, mode: 'bookmarks' })
    }, [])

    return(
        <div className="app_body">
            <BookmarkFeed />
        </div>
    )
}