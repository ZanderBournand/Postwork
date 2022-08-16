import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userSlice'
import { deleteComment, getComments, sendComment, updateComment } from '../../../services/posts'
import {Card, Modal, Button, IconButton, TextField, } from '@mui/material';
import "./AllComments.css"
import Comment from './Comment';
import CommentForm from './CommentForm';
import ClipLoader from "react-spinners/ClipLoader";

export default function Comments({post}) {

  const currentUser = useSelector(selectUser)

  const [comments, setComments] = useState([])
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
  useEffect(() => {
    getComments(post?.id).then((res) => {
        setComments(res)
    })
  }, [])

  const addComment = (body, parentId) => {
    sendComment(post, parentId, body, currentUser?.uid).then((res) => {
        setComments([res, ...comments])
        setActiveComment(null)
    })
  }

  const handleUpdateComment = (body, commentId) => {
    const updatedComments = comments.map((comment) => {
        if (comment.id == commentId) {
            return {...comment, comment: body}
        }
        return comment
    })
    setComments(updatedComments)
    setActiveComment(null)
    updateComment(post?.id, body, commentId)
  }

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
        (comment) => comment.id != commentId
    )
    setComments(updatedComments)
    deleteComment(post?.id, commentId)
  }

  return (
    <div className='commentsContainer'>
        <div className='commentTitleContainer'>
            <div className='commentTitle'>
                Comments
            </div>
            <div className='commentCountContainer'>
                <div className='commentCount'>{post?.data.commentsCount}</div>
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
                        key={rootComment.id} 
                        comment={rootComment} 
                        replies={getReplies(rootComment.id)}
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
