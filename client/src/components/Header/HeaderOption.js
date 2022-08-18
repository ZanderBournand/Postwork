import React from 'react'
import './HeaderOption.css'
import {Avatar} from '@mui/material'
import { useSelector } from 'react-redux';

export default function HeaderOption({avatar, Icon, title, onClick, size}) {
    const currentUser = useSelector((state) => state.auth)?.result
    return (
        <div onClick={onClick} className='headerOption'>
            {Icon && <Icon className="headerOption_icon" sx={{fontSize: size}}/>}
            {avatar && (<Avatar className="headerOption_icon">
                {currentUser?.email[0]}
                </Avatar>)}
            <h3 className="headerOption_title" style={{paddingTop: (size != null) ?  40 - size : 0}}>{title}</h3>
        </div>
    );
}