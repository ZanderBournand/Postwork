import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProfileFeed from '../components/Profile/ProfileFeed';
import ProfileInfo from '../components/Profile/ProfileInfo';
import { getPostsByUser } from '../services/posts';

export default function Profile(){

    const {state} = useLocation()
    const {user} = state
    const currentUser = useSelector((state) => state.auth)?.result

    const [userPosts, setUserPosts] = useState(null)

    useEffect(() => {
        const getUserPosts = async () => {
            const posts = await getPostsByUser(user?._id)
            setUserPosts(posts)
        }
        getUserPosts()
    }, [])

    return(
        <div className="profile_body">
            <ProfileInfo user={(user?._id === currentUser?._id) ? currentUser : user} posts={userPosts}/>
            <ProfileFeed posts={userPosts}/>
        </div>
    )
}