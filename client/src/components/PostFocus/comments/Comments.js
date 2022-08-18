import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
// import { getComments, sendComment, updateComment } from '../../../services/posts'
import {Card, Modal, Button, IconButton, TextField, } from '@mui/material';
import "./AllComments.css"
import Comment from './Comment';
import CommentForm from './CommentForm';
import ClipLoader from "react-spinners/ClipLoader";
import { createComment, deleteComment, updateComment } from '../../../redux/actions/posts';

export default function Comments({post}) {

  const currentUser = useSelector((state) => state.auth)?.result
  
  const dispatch = useDispatch()

  const [comments, setComments] = useState(post?.comments.sort((a, b) => (new Date(a?.timestamp) >new Date(b?.timestamp)) ? -1: 1))
  const [commentsCount, setCommentsCount] = useState(post?.comments.length)
  const rootComments = comments.filter(
    (comment) => comment.parentId === null
  )

  const [activeComment, setActiveComment] = useState(null)

  const getReplies = (commentId) => {
    return comments.filter((comment) => comment.parentId === commentId)
    .sort((a, b) => {
        const timestamp1 = (!a.timestamp.hasOwnProperty('seconds')) ? new Date().getTime() : a.timestamp
        const timestamp2 = (!b.timestamp.hasOwnProperty('seconds')) ? new Date().getTime() : b.timestamp

        return timestamp1 - timestamp2
    })
  }
  // useEffect(() => {
  //   getComments(post?.id).then((res) => {
  //       setComments(res)
  //   })
  // }, [])

  const addComment = (body, parentId) => {
    // sendComment(post, parentId, body, currentUser?.uid).then((res) => {
    //     setComments([res, ...comments])
    //     setActiveComment(null)
    // })
    setActiveComment(null)
    dispatch(createComment(post._id, { comment: body, parentId: parentId})).then((res) => {
      setCommentsCount(commentsCount + 1)
      setComments(res?.comments.sort((a, b) => (new Date(a?.timestamp) >new Date(b?.timestamp)) ? -1: 1))
    })
  }

  const handleUpdateComment = (body, commentId) => {
    const updatedComments = comments.map((comment) => {
        if (comment._id == commentId) {
            return {...comment, comment: body}
        }
        return comment
    })
    setComments(updatedComments)
    setActiveComment(null)
    dispatch(updateComment(post._id, commentId, body))
  }

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
        (comment) => comment._id != commentId
    )
    setComments(updatedComments)
    setCommentsCount(commentsCount - 1)
    // deleteComment(post?.id, commentId)
    dispatch(deleteComment(post._id, commentId))
  }

  return (
    <div className='commentsContainer'>
        <div className='commentTitleContainer'>
            <div className='commentTitle'>
                Comments
            </div>
            <div className='commentCountContainer'>
                <div className='commentCount'>{commentsCount}</div>
            </div>
        </div>
        <CommentForm submitLable="write" handleSubmit={addComment}/>
        {rootComments == null ?
            <div className='loaderContainer2'>
                <ClipLoader size={20} color='gray' loading={true}/>
            </div>
            :
            <div className='commentsList'>
                {rootComments.map((rootComment) => (
                    <Comment 
                        key={rootComment._id} 
                        comment={rootComment} 
                        replies={getReplies(rootComment._id)}
                        deleteComment={handleDeleteComment}
                        updateComment={handleUpdateComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                    />
                ))}
            </div>
        }
    </div>
  )
}
