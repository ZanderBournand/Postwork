import React, {useState} from 'react'
import {Card, Modal, Button, IconButton, TextField, } from '@mui/material';
import "./AllComments.css"

export default function CommentForm({submitLabel = 'Publish', handleSubmit, hasCancelButton = false, initialText = '', handleCancel}) {

  const [commentBody, setCommentBody] = useState(initialText)
  const disabled = commentBody.length == 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(commentBody)
    setCommentBody('')
  }

  const handleInputChange = ({target})=>{
    const {value} = target;
    setCommentBody(value)
  }

  return (
    <div className='sendCommentContainer'>
        <TextField
            hiddenLabel
            placeholder="Send a comment..."
            sx={{borderRadius: 5, width: '75%'}}
            value={commentBody}
            onChange={handleInputChange}
            multiline
            rows={2}
            size="small"
            fullWidth
        />
        <div className='sendButtonContainer'>
            <Button sx={{ textTransform: 'none', flex: 1,}} disabledsize="small" onClick={onSubmit} disabled={disabled}>
                <div className='sendButton'>
                    <div className='sendButtonText'>{submitLabel}</div>
                </div>
            </Button>
        </div>
        {hasCancelButton && (
            <div className='sendButtonContainer2'>
                <Button sx={{ textTransform: 'none', flex: 1,}} disabledsize="small" onClick={handleCancel}>
                    <div className='sendButton'>
                        <div className='sendButtonText'>Cancel</div>
                    </div>
                </Button>
            </div>
        )}
    </div>
  )
}
