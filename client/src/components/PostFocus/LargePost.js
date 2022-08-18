import React from 'react'
import {Card, Modal, IconButton } from '@mui/material';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { indigo, deepOrange } from '@mui/material/colors';
import { getTimeSincePost } from '../../services/helpers';
import "./LargePost.css"
import Comments from './comments/Comments';
import { useNavigate } from 'react-router-dom';

export default function LargePost({isOpen, setModalOpen, post, user, bookmarked, handleUpdateBookmark, vote, handleUpdateVote}) {

  const handleClose = () => setModalOpen(false);

  let navigate = useNavigate();

  const handleProfileNavigation = () => {
    navigate('/profile/' + encodeURIComponent(user?.displayName), {state: {user: user}})
  }

  return (
    <Modal
        open={isOpen}
        onClose={handleClose}
        sx={{overflow: 'hidden', p: 1,}}
    >
        <Card sx={style} className='translateFix'>
            <div className="postInformation">
                <div className='informationContainer2'>
                    <div className='subInformatioContainer_2'>
                    <IconButton size="small"  onClick={() => handleUpdateVote('up', vote)}>
                        <ArrowUpwardRoundedIcon sx={{fontSize: 25, color: (vote.state === 'up') ? indigo['A400'] : ''}}/>
                    </IconButton>
                    <div style={{color: (vote.state === 'up') ? indigo['A400'] : ((vote.state === 'down') ? deepOrange['A700'] : ''), fontWeight: (vote.state != null) ? 'bold' : ''}}>
                        {(vote.counter === null) ? 0 : vote.counter}
                    </div>
                    <IconButton size="small" onClick={() => handleUpdateVote('down', vote)}>
                        <ArrowDownwardRoundedIcon sx={{fontSize: 25, color: (vote.state === 'down') ? deepOrange['A700'] : ''}}/>
                    </IconButton>
                    </div>
                    <div className='subInformatioContainer2'>
                        <div className='title'>   
                            {post?.title}
                        </div>
                        <div className='userInfo'>
                            <div className='pictureContainer'>
                            {user?.photoUrl !== null && <input type="image" alt="user pfp" id="saveform" src={user?.photoUrl} className='profilePic' onClick={handleProfileNavigation}/>}
                            {user?.photoUrl === null && <input type="image" alt="default pfp" id="saveform" src={'https://cdn.wallpapersafari.com/8/21/es5Bd6.jpg'} className='profilePic' onClick={handleProfileNavigation}/>}
                            </div>
                            <div className='extraInfo'>
                                <button className="astext2" onClick={handleProfileNavigation}>
                                    {user?.displayName}
                                    </button>
                                <div className='date'>
                                    {post?.timestamp != null ? 
                                        getTimeSincePost(post?.timestamp)
                                        : 
                                        ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='subInformatioContainer3'>
                        <div>
                            <div className='tagContainer'>
                                <div className='tag'>{post?.tag}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='descriptionContainer2'>
                    <p className='description4'>{post?.details}</p>
                </div>
                <div className='buttonsContainer2'>
                    <div className='bookmarkContainer'>
                        <IconButton size="small" className='bookmark' onClick={() => handleUpdateBookmark(bookmarked)}>
                            {bookmarked ?
                                <BookmarkRoundedIcon sx={{color: indigo['A200'], fontSize: 30}}/>
                                :
                                <BookmarkBorderOutlinedIcon sx={{color: indigo[200], fontSize: 30}}/>
                            }
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className='divider'>
            </div>
            <Comments post={post}/>
        </Card>
    </Modal>
  )
}

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    maxHeight: '80%', 
    maxWidth: '700px', 
    minWidth: '400px', 
    width: '60%', 
    overflow: 'auto',
    paddingTop: 3,
    display: 'flex',
    height: '700px',
    flexDirection: 'column',
}
