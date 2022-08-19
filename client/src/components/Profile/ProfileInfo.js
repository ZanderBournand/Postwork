import React, {useState, useEffect} from 'react'
import "./ProfileInfo.css"
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import { getPostsStats } from '../../services/helpers';
import { Button, IconButton, TextField, Avatar, InputAdornment} from '@mui/material';
import OutboundIcon from '@mui/icons-material/Outbound';
import {useDispatch, useSelector} from "react-redux"
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../redux/actions/auth';


export default function ProfileInfo({user, posts, loading}) {

  const [stats, setStats] = useState(null)
  const [fieldMode, setFieldMode] = useState(false)
  const [aboutBody, setAboutBody] = useState((user?.about === null) ? '' : user?.about)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = useSelector((state) => state.auth)?.result
  const isCurrentUser = currentUser?.uid === user?.uid

  useEffect(() => {
    if (loading == false) {
        setStats([...getPostsStats(posts)])
    }
  }, [loading])
  
  const handleInputChange = ({target})=>{
    const {value} = target;
    setAboutBody(value)
  }

  const handleFieldModeChange = () => {
    setFieldMode(true)
  }
  
  const handleAboutChange = () => {
    setFieldMode(false)
    user.about = aboutBody
    dispatch(updateUser(user?._id, { about: aboutBody}))
  }

   const logoutOfApp = () => {
        dispatch({ type: 'LOGOUT'})
        navigate('/')
    };

  return (
    <div className='profileInfoContainer'>
        <img className='background' alt="background" src="https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=790&h=196&q=90&fm=png"/>
        <div className='profilePictureContainer'>
            <Avatar src={user?.photoUrl} className='profilePicture' sx={{width: '100%', height: '100%'}}/>
        </div>
        <div className='userInfoContainer'>
            <div className='infoSubContainer'>
                <div className='userDetails2'>
                    <div className='userNameAndStatus2'>
                        <div className='userName2'>{user?.displayName}</div>
                        {user?.recruiter && 
                        <div className='recruiterStatusContainer'>
                            <StarRoundedIcon sx={{fontSize: 24, color: '#FFC600'}}/>
                            <div className='recruiterStatusText'>
                                Recruiter
                            </div>
                        </div>}
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <div className='userEmail2'>{user?.email}</div>
                        {isCurrentUser &&
                            <>
                            <div className='interpunct2'>·</div>
                            <button className="astext3" onClick={logoutOfApp}>
                                <LogoutIcon fontSize='small' sx={{color: 'gray', paddingLeft: '10px'}}/>
                                <div className='logoutText'>Logout</div>
                            </button>
                            </>
                        }
                    </div>
                </div>
                <div className='userStats'>
                    <div className='StatsContainer'>
                        {stats?.length > 0 && <div className='statsContentContainer'>
                            <div className='statContainer'>
                                <BookmarkBorderRoundedIcon sx={{fontSize: 25, color: '#343434'}}/>
                                <div className='statsText'>
                                    {stats[0]}
                                </div>
                            </div>
                            <div className='statContainer'>
                                <ChatOutlinedIcon sx={{fontSize: 25, color: '#343434'}}/>
                                <div className='statsText'>
                                    {stats[1]}
                                </div>
                            </div>
                            <div className='statContainer2'>
                                <QueryStatsOutlinedIcon sx={{fontSize: 25, color: '#343434'}}/>
                                <div className='statsText'>
                                    {stats[2] >= 0 ? '+' : '-'}
                                    {Math.abs(stats[2])}
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <div className='aboutContainer'>
                <div className='aboutTitleContainer'>
                    <div className='aboutTitle'>About</div>
                    {isCurrentUser && 
                        <>
                        <div className='interpunct2'>·</div>
                        <button className="astext" onClick={handleFieldModeChange}>Edit</button>
                        </>
                    }
                </div>
                {fieldMode === false ? 
                    <div className='aboutContentContainer'>
                        {user?.about != null ?
                            <p className='aboutContent'>
                                {user?.about}
                            </p>
                            :
                            <div className='noAbout'>
                                {isCurrentUser ? 
                                    <>
                                    <div>You currently dont have any information here!</div>
                                    <Button sx={{ textTransform: 'none'}} onClick={handleFieldModeChange}>
                                        <div>Add Details</div>
                                    </Button>
                                    </>
                                    :
                                    <div>This user has not entered any information yet!</div>
                                }
                            </div>
                        }
                    </div>
                    :
                    <div className='inputFieldContainer'>
                        <TextField
                            hiddenLabel
                            placeholder="Tell us about you..."
                            sx={{borderRadius: 5, width: '80%'}}
                            value={aboutBody}
                            onChange={handleInputChange}
                            multiline
                            rows={5}
                            size="small"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" sx={{paddingTop: 9, paddingRight: 1,}}>
                                        <IconButton edge="end" sx={{color: '#4F74FD'}} onClick={handleAboutChange}>
                                            <OutboundIcon fontSize="large"/>
                                        </IconButton>
                                    </InputAdornment>
                                ), maxLength: 500
                            }}
                        />
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
