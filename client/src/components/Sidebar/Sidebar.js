import React, {useState} from "react";
import {Avatar, TextField, Box, Button} from '@mui/material'
import "./Sidebar.css";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useSelector, useDispatch } from "react-redux";
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import { indigo } from '@mui/material/colors';
import { createPost } from "../../redux/actions/posts";
import { CHANGE_POSTS_TYPE } from "../../redux/constants";

export default function Sidebar() {

    const currentUser = useSelector((state) => state.auth)?.result
    const postsType = useSelector((state) => state.posts.type)

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        title: "",
        tag:"",
        details:"",
    });

    const handleChange = ({target})=>{
        const {id, value} = target;
        setInput((prev)=>({
            ...prev,
            [id]:value
        }));
    }

    async function handleSendPost(e){
        e.preventDefault();
        if (input.title !== "" && input.tag !== "" && input.details !==""){
            setInput({
                title: "",
                tag:"",
                details:"",
            })
            dispatch(createPost({title: input.title, tag: input.tag, details: input.details}))
        }
    };

    const handlePostsTypeChange = (type) => {
        if (type === "hot") {
            dispatch({ type: CHANGE_POSTS_TYPE, mode: type })
        }
        else if (type === "new") {
            dispatch({ type: CHANGE_POSTS_TYPE, mode: type })
        }
    }

    return (
        <div className="sidebar">
            <div className="buttonsContainer">
                <div className={(postsType == 'hot') ? 'buttonContainerSelected' : 'buttonContainerNotSelected'}>
                    <Button sx={{flex: 1}} onClick={() => handlePostsTypeChange('hot')}>
                        <div className='button'>
                            {postsType == 'hot' ?
                                <WhatshotRoundedIcon sx={{fontSize: 30, color: indigo['A400']}}/>
                                :
                                <WhatshotOutlinedIcon sx={{fontSize: 30, color: indigo['A100']}}/>
                            }
                            <p className={(postsType == 'hot') ? 'buttonTextSelected' : 'buttonTextNotSelected'}>HOT</p>
                        </div>
                    </Button>
                </div>
                <div className={(postsType == 'new') ? 'buttonContainerSelected' : 'buttonContainerNotSelected'}>
                    <Button sx={{flex: 1}} onClick={() => handlePostsTypeChange('new')}>
                        <div className='button'>
                            {postsType == 'new' ?
                                <NewReleasesRoundedIcon sx={{fontSize: 30, color: indigo['A400']}}/>
                                :
                                <NewReleasesOutlinedIcon sx={{fontSize: 30, color: indigo['A100']}}/>
                            }
                            <p className={(postsType == 'new') ? 'buttonTextSelected' : 'buttonTextNotSelected'}>NEW</p>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="sidebar_top">
                <img src="https://bq9mowy10i-flywheel.netdna-ssl.com/wp-content/uploads/2016/12/Powder-Blue-Background-300x300.jpg"
                     alt=""/>
                <Avatar src={currentUser.photoUrl}className="sidebar_avatar">
                    {currentUser.email[0]} 
                </Avatar>
                <h2>{currentUser.displayName}</h2>
                <h4>{currentUser.email}</h4>
            </div>

            <div className="sidebar_bottom">
                <Box mb={2}>
                    <BorderColorIcon className="sidebar_icon"/>
                    <TextField
                        id="title"
                        label="Title"
                        size="small"
                        onChange={handleChange}
                        value = {input.title}
                    />
                </Box>
                <Box mb={2} ml={4}>
                    <TextField
                        id="tag"
                        label="Tag"
                        size="small"
                        onChange={handleChange}
                        value = {input.tag}
                    />
                </Box>
                <Box mb={2} >
                    <TextField
                        id="details"
                        label="Detail"
                        size="small"
                        multiline
                        rows ={5}
                        fullWidth
                        onChange={handleChange}
                        value = {input.details}
                    />
                </Box>
                <Box ml={25}><Button variant="contained" onClick={handleSendPost} type="submit">Post</Button></Box>
            </div>

        </div>
    )
}