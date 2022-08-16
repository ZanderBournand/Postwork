import React, {useState} from 'react'
import { useUser } from '../../../hooks/useUser'
import { getTimeSincePost } from '../../../services/helpers'
import {Card, Button, IconButton, makeStyles} from '@mui/material'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import CommentForm from './CommentForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { indigo } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function Comment({comment, replies, deleteComment, addComment, activeComment, setActiveComment, parentId = null, updateComment}) {

  const user = useUser(comment?.user).data
  const currentUser = useSelector(selectUser)

  const [showReplies, setShowReplies] = useState(false)

  const fiveMinutes = 300000
  const timePassed = new Date() - new Date(comment?.timestamp.seconds * 1000) > fiveMinutes
  const canEdit = currentUser?.uid === comment?.user && !timePassed
  const canDelete = currentUser?.uid === comment?.user && !timePassed
  const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id
  const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id
  const replyId = parentId ? parentId : comment.id

  let navigate = useNavigate()

  const handleProfileNavigation = () => {
    navigate('/profile/' + user?.displayName.replace(/\s/g , "-"), {state: {user: user}})
  }

  return (
    <div className={(comment.parentId == null) ? 'fullCommentContainerParent' : 'fullCommentContainerChild'}>
        <div className='commentInfoContainer'>
            <div className='commentPicture'>
                {user?.photoUrl != null && <input type="image" id="saveform" src={user?.photoUrl} className='picture' onClick={handleProfileNavigation}/>}
                {user?.photoUrl == null && <input type="image" id="saveform" src={'https://cdn.wallpapersafari.com/8/21/es5Bd6.jpg'} className='picture' onClick={handleProfileNavigation}/>}
            </div>
            <button className='commentUserName2' onClick={handleProfileNavigation}>
                {user?.displayName}
            </button>
            <div className='interpunct'>
                ·
            </div>
            <div className='commentTime'>
                {comment?.timestamp != null ? 
                    getTimeSincePost(comment?.timestamp)
                    : 
                    ''
                }
            </div>
        </div>
        <div className='commentBody'>
            {!isEditing && <div>{comment?.comment}</div>}
            {isEditing && (
                <CommentForm 
                    submitLabel="Update" 
                    hasCancelButton 
                    initialText={comment.comment} 
                    handleSubmit={(commentBody) => updateComment(commentBody, comment.id)}
                    handleCancel={() => setActiveComment(null)}
                />
            )}
        </div>
        <div className='commentActions'>
            {replies.length > 0 && (
                <Button sx={{textTransform: 'none', paddingLeft: 0}}  className='showRepliescontainer' onClick={() => setShowReplies(!showReplies)} disableRipple>
                    {showReplies ?
                        <ArrowDropUpRoundedIcon sx={{color: indigo['A200']}}/>
                        :
                        <ArrowDropDownRoundedIcon sx={{color: indigo['A200']}}/>
                    }
                    <div className='showRepliesText'>{showReplies ? 'Hide' : 'Show'} {(replies.length > 1) ? replies.length + " replies" : "reply"}</div>
                </Button>
            )}
            <div className='ButtonContainer'>
                <Button size="small" sx={{color: 'gray', textTransform: 'none'}} onClick={() => {
                    if (JSON.stringify(activeComment) === JSON.stringify({id: comment.id, type: 'replying'})) {
                        setActiveComment(null)
                    }
                    else {
                        setActiveComment({id: comment.id, type: 'replying'})
                    }
                }}>
                    <div className='Button'>
                        <ReplyRoundedIcon sx={{color: 'gray'}} fontSize="small" />
                        <p className='ButtonText'>Reply</p>
                    </div>
                </Button>
            </div>
            {canEdit && 
            <div className='ButtonContainer'>
                <Button size="small" sx={{color: 'gray', textTransform: 'none'}} onClick={() => {        
                    if (JSON.stringify(activeComment) === JSON.stringify({id: comment.id, type: 'editing'})) {
                        setActiveComment(null)
                    }
                    else {
                        setActiveComment({id: comment.id, type: 'editing'})
                    }
                }}>
                    <div className='Button'>
                        <EditRoundedIcon sx={{color: 'gray'}} fontSize="small" />
                        <p className='ButtonText'>Edit</p>
                    </div>
                </Button>
            </div>}
            {canDelete && 
            <div className='ButtonContainer'>
                <Button size="small" sx={{color: 'gray', textTransform: 'none'}} onClick={() => deleteComment(comment?.id)}>
                    <div className='Button'>
                        <DeleteForeverIcon sx={{color: 'gray'}} fontSize="small" />
                        <p className='ButtonText'>Delete</p>
                    </div>
                </Button>
            </div>}
        </div>
        {isReplying && (
            <CommentForm 
                submitLabel="Reply" 
                handleSubmit={(commentBody) => addComment(commentBody, replyId)}
                handleCancel={() => setActiveComment(null)}
                hasCancelButton
            />
        )}
        {replies.length > 0 && showReplies && (
            <div className='replies'>
                {replies.map((reply) => (
                    <Comment 
                        comment={reply} 
                        key={reply.id} 
                        replies={[]}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        addComment={addComment}
                        parentId={comment.id}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                    />
                ))}
            </div>
        )}
    </div>
  )
}
