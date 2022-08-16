import React, { useState, useEffect } from 'react'
import "./BookmarkFeed.css";
import { db } from '../../firebase'
import Grid from '@mui/material/Grid';
import ClipLoader from "react-spinners/ClipLoader";
import { getBookmarksById, getBookmarkedPosts, getFeedOnce } from '../../services/posts';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import Post from '../Feed/Post/Post';

export default function BookmarkFeed() {

  const [bookmarks, setBookmarks] = useState(null)
  const [posts, setPosts] = useState(null)
  const currentUser = useSelector(selectUser);

  const bookmarkedPosts = posts?.filter(
    (post) => {
      if(bookmarks?.includes(post?.id)){
        return true
      }
      else{
        return false
      }
    }
  )

  useEffect(() => {
    getBookmarksById(currentUser?.uid, setBookmarks)
    getFeedOnce().then((res) => {
      setPosts(res)
    })
  }, [])

  return (
    <div className='containerBookmarks'>
      {bookmarkedPosts == null ?
        <div className='loaderContainerBookmarks'>
          <ClipLoader size={20} color='gray' loading={true}/>
        </div>
        :
        bookmarkedPosts.length > 0 ?
        <Grid style={{}} className='grid' container alignItems="stretch" spacing={3}>
          {bookmarkedPosts.map((post) => (
            <Grid key={post.id} item xs={12} sm={12} md={6} lg={6} xl={4}>
              <Post post={post}/>
            </Grid>
          ))}
        </Grid>
        :
        <div className='noBookmarksContainer'>
          <div className='noBookmarksText'>You currently have no bookmarks!</div>
        </div>
      }
    </div>
  )
}
