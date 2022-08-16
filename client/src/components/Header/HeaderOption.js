import React from 'react'
import './HeaderOption.css'
import {Avatar, cardClasses} from '@mui/material'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

export default function HeaderOption({avatar, Icon, title, onClick, size}) {
    const currentUser = useSelector(selectUser);
    return (
        <div onClick={onClick} className='headerOption'>
            {Icon && <Icon className="headerOption_icon" sx={{fontSize: size}}/>}
            {avatar && (<Avatar className="headerOption_icon">
                {currentUser?.email[0]}
                </Avatar>)}
            <h3 className="headerOption_title" style={{paddingTop: (40 - size)}}>{title}</h3>
        </div>
    );
}