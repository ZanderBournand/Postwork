import React, { useState, useEffect } from 'react'
import "./Feed.css";
import Grid from '@mui/material/Grid';
import Post from './Post/Post';
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from 'react-redux';

export default function Feed() {

  const [currentPosts, setCurrentPosts] = useState(null)

  const postsRedux = useSelector((state) => state.posts.posts)


  useEffect(() => {
    setCurrentPosts(postsRedux)
  }, [postsRedux])

  return (
    <div className='container'>
      {currentPosts == null ?
        <div className='loaderContainer'>
          <ClipLoader size={20} color='gray' loading={true}/>
        </div>
        :
        <Grid style={{}} className='grid' container alignItems="stretch" spacing={3}>
          {currentPosts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={12} lg={6} xl={4}>
              <Post post={post}/>
            </Grid>
          ))}
        </Grid>
      }
    </div>
  )
}
