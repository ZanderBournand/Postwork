import React, {useState, useEffect, useMemo} from 'react'
import "./Post.css";
import {Card, Button, IconButton} from '@mui/material'
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { indigo, yellow, deepOrange, red } from '@mui/material/colors';
import { useUser } from '../../../hooks/useUser';
import { getBookmarkByPostId, getVoteByPostId, updateBookmark, updateVote } from '../../../services/posts';
import {selectUser} from "../../../features/userSlice"
import {useSelector} from "react-redux";
import { throttle } from 'throttle-debounce';
import { getTimeSincePost } from '../../../services/helpers';
import LargePost from '../../PostFocus/LargePost';
import {useNavigate} from 'react-router-dom'
import { useUserMutation } from '../../../hooks/useUserMutation';

export default function Post({post}) {

  const [bookmarked, setBookmarked] = useState(false)
  const [vote, setVote] = useState({
    state: null,
    counter: post?.data.votesCount,
  })
  const [modalOpen, setModalOpen] = useState(false)

  const user = useUser(post?.data.user).data
  const currentUser = useSelector(selectUser)

  const newUser = useUserMutation()

  let navigate = useNavigate();

  useEffect(() => { 
    getBookmarkByPostId(post?.id, currentUser?.uid).then((res) => {
        setBookmarked(res)
    })
    getVoteByPostId(post?.id, currentUser?.uid).then((res) => {
        setVote({
            ...vote,
            state: res
        })
    })
  }, [])    

  const handleUpdateBookmark = useMemo(
    () =>
      throttle(500, (currentBookmarkStateInst) => {
        setBookmarked(!currentBookmarkStateInst);
        updateBookmark(post, currentUser?.uid, currentBookmarkStateInst);
        newUser.mutate({userId: user?.uid, userModified: {
            ...user,
            stats: {
                bookmarksCount: user?.stats.bookmarksCount + ((currentBookmarkStateInst) ? -1 : 1)
            }
        }})
      }),
    []
  );

  const handleUpdateVote = useMemo(
    () =>
      throttle(500, (type, currentVoteStateInst) => {
        if (currentVoteStateInst.state == null) {
            setVote({
                state: type,
                counter: (type == 'up') ? currentVoteStateInst.counter + 1 : currentVoteStateInst.counter - 1,
            })
        }
        else {
            if (currentVoteStateInst.state == type) {
                setVote({
                    state: null,
                    counter: (type == 'up') ? currentVoteStateInst.counter - 1 : currentVoteStateInst.counter + 1,
                })
            }
            else {
                setVote({
                    state: type,
                    counter: (type == 'up') ? currentVoteStateInst.counter + 2 : currentVoteStateInst.counter - 2,
                })
            }
        }
        updateVote(post?.id, currentUser?.uid, currentVoteStateInst, type);
      }),
    []
  );

  const handleProfileNavigation = () => {
    navigate('/profile/' + user?.displayName.replace(/\s/g , "-"), {state: {user: user}})
  }

  return (
    <>
    <Card sx={{height: 400, minWidth: 400, alignSelf: 'center', borderRadius: 2}}>
        <div className='container'>
            <div className='informationContainer'>
                <div className='subInformatioContainer'>
                    <IconButton size="small">
                        <ArrowUpwardRoundedIcon sx={{fontSize: 25, color: (vote.state == 'up') ? indigo['A400'] : ''}} onClick={() => handleUpdateVote('up', vote)}/>
                    </IconButton>
                    <div style={{color: (vote.state == 'up') ? indigo['A400'] : ((vote.state == 'down') ? deepOrange['A700'] : ''), fontWeight: (vote.state != null) ? 'bold' : ''}}>
                        {(vote.counter == null) ? 0 : vote.counter}
                    </div>
                    <IconButton size="small">
                        <ArrowDownwardRoundedIcon sx={{fontSize: 25, color: (vote.state == 'down') ? deepOrange['A700'] : ''}} onClick={() => handleUpdateVote('down', vote)}/>
                    </IconButton>
                </div>
                <div className='subInformatioContainer2'>
                    <div className='title'>   
                        {post?.data?.title}
                    </div>
                    <div className='userInfo'>
                        <div className='pictureContainer'>
                        {user?.photoUrl != null && <input type="image" id="saveform" src={user?.photoUrl} className='profilePic' onClick={handleProfileNavigation}/>}
                        {user?.photoUrl == null && <input type="image" id="saveform" src={'https://cdn.wallpapersafari.com/8/21/es5Bd6.jpg'} className='profilePic' onClick={handleProfileNavigation}/>}
                        </div>
                        <div className='extraInfo'>
                            <div className='userName'>
                                <button class="astext2" onClick={handleProfileNavigation}>{user?.displayName}</button>
                                {user?.recruiter &&
                                <div className='recruiterContainer'>
                                    <StarRoundedIcon sx={{fontSize: 24, color: '#FFBC00'}}/>
                                    <div className='recruiterText'>
                                        Recruiter
                                    </div>
                                </div>
                                }
                            </div>
                            <div className='date'>
                                {post?.data?.timestamp != null ? 
                                    getTimeSincePost(post?.data?.timestamp)
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
                            <div className='tag'>{post?.data?.tag}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='descriptionContainer'>
                <p className='description'>{post?.data?.details}</p>
            </div>
            <div className='buttonsContainer'>
                <div className='bookmarkContainer'>
                    <IconButton size="small" className='bookmark' onClick={() => handleUpdateBookmark(bookmarked)}>
                        {bookmarked ?
                            <BookmarkRoundedIcon sx={{color: indigo['A200'], fontSize: 25}}/>
                            :
                            <BookmarkBorderOutlinedIcon sx={{color: indigo[200], fontSize: 25}}/>
                        }
                    </IconButton>
                </div>
                <div className='commentContainer'>
                    <Button size="small" onClick={() => setModalOpen(true)}>
                        <div className='comment'>
                            <ChatBubbleRoundedIcon sx={{color: indigo['A100']}} fontSize="medium" />
                            <p className='commentText'>Discuss</p>
                        </div>
                    </Button>
                </div>
            </div>
        </div >
    </Card>
    {modalOpen && <LargePost 
        isOpen={modalOpen} 
        setModalOpen={setModalOpen} 
        post={post} 
        user={user}
        bookmarked={bookmarked}
        handleUpdateBookmark={handleUpdateBookmark}
        vote={vote}
        handleUpdateVote={handleUpdateVote}
    />}
    </>
  )
}
