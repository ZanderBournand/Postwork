import React, {useState, useEffect} from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HeaderOption from './HeaderOption';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import decode from 'jwt-decode'
import { searchPosts } from '../../redux/actions/posts';

export default function Header() {
    
    const currentUser = useSelector((state) => state.auth)?.result
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()

    const [searchTerm, setSearchTerm] = useState('');

    const handleProfileNavigation = () => {
        navigate('/profile/' + encodeURIComponent(currentUser?.displayName), {state: {user: currentUser}})
    }

    useEffect(() => {
        dispatch(searchPosts(searchTerm))
    }, [searchTerm])

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('profile'))?.token
       
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({ type: 'LOGOUT'})
                navigate('/')
            
            }
        }

    }, [location])

    if(!currentUser){
        return (
            <div className='header'>
                <div className='header_left'>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/1200px-Florida_Gators_gator_logo.svg.png"
                        alt=""/>
                    <h2>International Gator Job Board</h2>
                </div>

                <div className='header_right'>
                    <HeaderOption
                        avatar={true}
                        title='Me'
                    />
                </div>
            </div>
        )

    }
    else {
        return (
            <div className='header'>
                <div className='header_left'>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/1200px-Florida_Gators_gator_logo.svg.png"
                        alt=""/>
                    <div className="header_search">
                        <SearchIcon/>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            onChange={event => {setSearchTerm(event.target.value)}}
                        />
                    </div>
                    <h2>International Gator Job Board</h2>
                </div>
                <div className='header_right'>
                    <Link to="/" style={{ textDecoration: 'none' }}><HeaderOption Icon={HomeRoundedIcon} title='Home' size={40}/></Link>
                    <Link to="/bookmarks" style={{ textDecoration: 'none' }}><HeaderOption Icon={BookmarksIcon} title='Bookmarks' size={35}/></Link>
                    <HeaderOption
                        avatar={true}
                        title='Me'
                        onClick={handleProfileNavigation}
                    />
                </div>
            </div>
        )
    }
}