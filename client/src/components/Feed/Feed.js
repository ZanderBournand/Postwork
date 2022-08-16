import React, { useState, useEffect } from 'react'
import "./Feed.css";
import { db } from '../../firebase'
import Grid from '@mui/material/Grid';
import Post from './Post/Post';
import ClipLoader from "react-spinners/ClipLoader";
import { getFeed } from '../../services/posts';
import { useSelector } from 'react-redux';
import { selectPostsType } from "../../features/postsTypeSlice";
import { getHotValue } from '../../services/helpers';
import { selectSearch } from '../../features/searchSlice';

export default function Feed() {

  const [posts, setPosts] = useState(null)
  const [hotPosts, setHotPosts] = useState(null)
  const [currentPosts, setCurrentPosts] = useState(null)
  const currentPostsType = useSelector(selectPostsType)
  const currentSearchState = useSelector(selectSearch)

  useEffect(() => {
    getFeed(setPosts)
  }, [])

  useEffect(() => {
    if (posts != null && (currentPosts == null || posts.length > currentPosts.length)) {
      console.log("NEW POSTS")
      setHotPosts([...posts]?.sort((a, b) => (getHotValue(a?.data?.votesCount, a?.data?.timestamp?.toDate()) > getHotValue(b?.data.votesCount, b?.data.timestamp?.toDate())) ? -1 : 1))
      if (currentPostsType == 'new') {
        setCurrentPosts(posts)
      }
    }
  }, [posts])

  useEffect(() => {
    if (hotPosts != null) {
      if (currentPostsType != 'new') {
        setCurrentPosts(hotPosts)
      }
    }
  }, [hotPosts])

  useEffect(() => {
    if (currentPostsType == 'hot') {
      setCurrentPosts(hotPosts)
    }
    else {
      setCurrentPosts(posts)
    }
  }, [currentPostsType])

  useEffect(() => {
    if (currentSearchState != null && currentSearchState?.searching == true) {
      if (currentPostsType == 'hot') { 
        setCurrentPosts(hotPosts?.filter(post => post?.data.title.toLowerCase().includes(currentSearchState.searchWord) || post?.data.tag.toLowerCase().includes(currentSearchState.searchWord)))
      }else if (currentPostsType == 'new'){
        setCurrentPosts(posts?.filter(post => post?.data.title.toLowerCase().includes(currentSearchState.searchWord) || post?.data.tag.toLowerCase().includes(currentSearchState.searchWord)))
      }
    }
    else {
      if (currentPostsType == 'hot') { 
        setCurrentPosts(hotPosts)
      }else if (currentPostsType == 'new'){
        setCurrentPosts(posts)
      }
    }
  }, [currentSearchState])

  return (
    <div className='container'>
      {currentPosts == null ?
        <div className='loaderContainer'>
          <ClipLoader size={20} color='gray' loading={true}/>
        </div>
        :
        <Grid style={{}} className='grid' container alignItems="stretch" spacing={3}>
          {currentPosts.map((post) => (
            <Grid key={post.id} item xs={12} sm={12} md={12} lg={6} xl={4}>
              <Post post={post}/>
            </Grid>
          ))}
        </Grid>
      }
    </div>
  )
}
