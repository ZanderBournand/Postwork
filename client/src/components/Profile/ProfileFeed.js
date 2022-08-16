import React from 'react'
import Grid from '@mui/material/Grid';
import Post from '../Feed/Post/Post';
import ClipLoader from "react-spinners/ClipLoader";
import "./ProfileFeed.css"

export default function ProfileFeed({posts}) {
  return (
    <div className='profileFeedContainer'>
      {posts == null ?
        <div className='loaderContainer'>
          <ClipLoader size={20} color='gray' loading={true}/>
        </div>
        :
        <Grid style={{}} className='grid' container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid key={post.id} item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Post post={post}/>
            </Grid>
          ))}
        </Grid>
      }
    </div>
  )
}
