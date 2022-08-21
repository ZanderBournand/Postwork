import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import {useNavigate} from 'react-router-dom'
import {GoogleLogin} from '@react-oauth/google'
import { Grid } from '@mui/material'
import { signin, signinGoogle, signup } from "../../redux/actions/auth";
import Input from './Input'
import LoginModal from "./LoginModal";
import jwt_decode from 'jwt-decode'

const Login = () => {

    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [modalOpen, setModalOpen] = useState(false)

    const currentUser = useSelector((state) => state.auth)?.result

    let navigate =useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser && currentUser?.photoUrl === null) {
            setModalOpen(true)
        }
        else if (currentUser && currentUser?.photoUrl !== null) {
            setModalOpen(false)
        }
    }, [currentUser])
        
    const handleSubmit = (e) => {
        e.preventDefault()
    
        if (isSignUp) {
            dispatch(signup(formData, navigate))
        }
        else {
            dispatch(signin(formData, navigate))
        }
      }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
      }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignUp((prevValue) => !prevValue)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = jwt_decode(res?.credential)
        dispatch(signinGoogle(result))
    }

    const googleError = () => {
        console.log("Google Sign In was unsuccessful. Try Again later")
    }
    
    return (
    <>
        <div className="login">
            <img 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/1200px-Florida_Gators_gator_logo.svg.png" 
                alt=""
            />

            <form style={{paddingTop: 20, width: '365px'}}>

                <Grid container spacing={2}>

                {isSignUp && (
                    <>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </>
                ) }

                <Input 
                    name="email" 
                    label="Email Address" 
                    handleChange={handleChange} 
                    type="email" 
                />

                <Input 
                    name="password" 
                    label="Password" 
                    handleChange={handleChange} 
                    type={showPassword ? 'text' : 'password'} 
                    handleShowPassword={handleShowPassword} 
                />

                { isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" /> }

                </Grid>

                <button className="submitButton" type='submit' onClick={handleSubmit}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '15px'}}>
                    <GoogleLogin 
                        onSuccess={googleSuccess}
                        onError={googleError}
                    />
                </div>
                
            </form>

            <div style={{marginTop: '15px'}}>
                {isSignUp ? 'Already have an account' : 'Not a member?'}
                <button className="changeModebutton" onClick={switchMode}>
                    {isSignUp ? 'Login Now' : 'Register Now'}
                </button>
            </div>

        </div>
        {modalOpen && <LoginModal 
            isOpen={modalOpen}
            setModalOpen={setModalOpen}
        />}
    </>
    );
}

export default Login;
