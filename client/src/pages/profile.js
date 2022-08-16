import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import ProfileFeed from '../components/Profile/ProfileFeed';
import ProfileInfo from '../components/Profile/ProfileInfo';
import { getPostsByUser } from '../services/posts';

export default function Profile(){

    const {state} = useLocation()
    const {user} = state

    const [userPosts, setUserPosts] = useState(null)

    useEffect(() => {
        getPostsByUser(user?.uid).then((posts) => {
            setUserPosts(posts)
        })
    }, [])

    return(
        <div className="profile_body">
            <ProfileInfo user={user} posts={userPosts}/>
            <ProfileFeed posts={userPosts}/>
        </div>
    )
}