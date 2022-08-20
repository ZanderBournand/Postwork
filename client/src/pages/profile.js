import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import ProfileFeed from '../components/Profile/ProfileFeed';
import ProfileInfo from '../components/Profile/ProfileInfo';
import { CHANGE_POSTS_TYPE, POSTS_LOADING } from '../redux/constants';
import { getPostsByUser } from '../services/posts';
import { getUserProfile } from '../services/user';

export default function Profile(){

    const {state} = useLocation()
    const currentUser = useSelector((state) => state.auth)?.result
    const profilePosts = useSelector((state) => state.posts.posts)
    const { urldId } = useParams()
    const dispatch = useDispatch()

    const loading = useSelector((state) => state.posts.loading)
    const mode = useSelector((state) => state.posts.type)
    const notLoading = loading === false && mode === 'profile'

    const [userProfile, setUserProfile] = useState(null)

    useEffect(() => {
        const getInfo = async () => {
            let user = null
            let posts = null
            dispatch({ type: POSTS_LOADING, loading: true })
            if (state != null) {
                setUserProfile(state?.user)
                posts = await getPostsByUser(state?.user?._id)
                dispatch({ type: CHANGE_POSTS_TYPE, mode: 'profile', payload: posts})
                dispatch({ type: POSTS_LOADING, loading: false })
            }
            else {
                user = await getUserProfile(urldId)
                setUserProfile(user[0])
                posts = await getPostsByUser(user[0]?._id)
            }
            dispatch({ type: CHANGE_POSTS_TYPE, mode: 'profile', payload: posts})
            dispatch({ type: POSTS_LOADING, loading: false })
        }
        getInfo()
        window.scrollTo(0, 0)
    }, [urldId])

    return(
        <div className="profile_body">
            <ProfileInfo user={(userProfile?._id === currentUser?._id) ? currentUser : userProfile} posts={profilePosts} loading={!notLoading}/>
            <ProfileFeed posts={profilePosts} loading={!notLoading}/>
        </div>
    )
}