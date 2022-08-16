import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { auth } from "../../firebase";
import "./Login.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase'
import {useNavigate} from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';
import { getUserById } from "../../services/user";


function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");
const [profilePic, setProfilePic] = useState("");
const [checked, setChecked] = useState(false)

const currentUser = useSelector(selectUser);
let navigate =useNavigate();
const dispatch = useDispatch();
    const loginToApp = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email,password)
        .then(userAuth => {
            getUserById(userAuth.user.uid) .then((res) => {
                dispatch(login(res))
            })
            navigate("/")
        }).catch((error) => alert(error));

    };
        
    const register = () => {
        if (!name) {
            return alert("Please enter a full name!");
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
            updateProfile(userAuth.user,{
                displayName: name,
                photoURL: (profilePic.length > 0) ? profilePic : null,
                stats: {
                    bookmarksCount: 0
                },
                recruiter: checked,
                about: null
            })
            .then(() =>{
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoUrl: (profilePic.length > 0) ? profilePic : null,
                    stats: {
                        bookmarksCount: 0
                    },
                    recruiter: checked,
                    about: null
                }));
                setDoc(doc(db, "users", userAuth.user.uid),{
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    stats: {
                        bookmarksCount: 0
                    },
                    photoUrl: (profilePic.length > 0) ? profilePic : null,
                    recruiter: checked,
                    about: null
                })
            })
            navigate("/")
        })
        .catch(error => alert(error));
    };
    return (
    <div className="login">
        <img 
            src="https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/1200px-Florida_Gators_gator_logo.svg.png" 
            alt=""
        />
        <form style={{paddingTop: 20,}}>
            <input 
            value={name} 
            onChange={(e)=> setName(e.target.value)} 
            placeholder="Full name (required if registering)"
            type="text" />

            <input 
            value={profilePic} 
            onChange={(e)=> setProfilePic(e.target.value)}
            placeholder="Profile pic URL (optional)" 
            type="text" />

            <input 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)} 
                placeholder="Email" 
                type="email" 
            />
            <input 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Password" 
                type="password" 
            />

            <div className="checkboxContainer">
                <Checkbox
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 30, paddingLeft: 0 } }}
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <div className="checkboxText">Are you a recruiter / employer ?</div>
            </div>

            <button type='submit' onClick={loginToApp}>Sign In</button>
            
        </form>

        <p>Not a member?{" "}
            <span className ="login_register" onClick={register}
            >Register Now </span>
        </p>
    </div>
    );
}

export default Login;
