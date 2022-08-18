import React, { useState } from 'react'
import "./BookmarkFeed.css";
import Grid from '@mui/material/Grid';
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from 'react-redux';
import Post from '../Feed/Post/Post';

export default function BookmarkFeed() {

  const [bookmarks, setBookmarks] = useState(null)
  const [posts, setPosts] = useState(null)

  const testBookmarks = useSelector((state) => state.posts.bookmarkedPosts)
  
  return (
    <div className='containerBookmarks'>
      {testBookmarks == null ?
        <div className='loaderContainerBookmarks'>
          <ClipLoader size={20} color='gray' loading={true}/>
        </div>
        :
        testBookmarks.length > 0 ?
        <Grid style={{}} className='grid' container alignItems="stretch" spacing={3}>
          {testBookmarks.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={6} xl={4}>
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
