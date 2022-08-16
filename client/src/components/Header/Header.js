import React, {useState, useEffect} from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HeaderOption from './HeaderOption';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { logout, selectUser } from '../../features/userSlice';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { changeSearch } from '../../features/searchSlice';

export default function Header() {
    
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('');

    const logoutOfApp = () => {
        dispatch(logout());
        auth.signOut();
    };

    const handleProfileNavigation = () => {
        console.log("current user is: ", currentUser);
        navigate('/profile/' + currentUser?.displayName.replace(/\s/g , "-"), {state: {user: currentUser}})
    }

    useEffect(() => {
        if (searchTerm.length >0 ) {
            dispatch(changeSearch({
                searching: true,
                searchWord: searchTerm.toLowerCase(),
            }))
        }
        else {
            dispatch(changeSearch({
                searching: false,
                searchWord: null,
            }))
        }
    }, [searchTerm])

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
                        onClick={logoutOfApp}/>
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
                    <Link to="/"><HeaderOption Icon={HomeRoundedIcon} title='Home' size={40}/></Link>
                    <Link to="/bookmarks"><HeaderOption Icon={BookmarksIcon} title='Bookmarks' size={35}/></Link>
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