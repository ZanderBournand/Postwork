import React, {useState} from 'react'
import {Card, Modal, IconButton, Avatar} from '@mui/material';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import './Login.css'
import FileBase from 'react-file-base64'

const LoginModal = ({ isOpen, setModalOpen, }) => {

  const currentUser = useSelector((state) => state.auth)?.result

  const handleClose = () => setModalOpen(false);

  const [userInfo, setUserInfo] = useState({
    photoUrl: null,
    displayName: '',
    about: '',
  })

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    console.log("called with: ", file)
    const base64 = await convertBase64(file)
    setUserInfo({ ...userInfo, photoUrl: base64 })
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  return (
    <Modal 
        open={isOpen} 
        onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
    >
        <Card sx={style}>
            <div className="topContainer">
                <div className="modalTitle">Set Up Your Profile</div>
                <IconButton size="small"  onClick={() => setModalOpen(false)}>
                    <CloseIcon sx={{fontSize: 30}}/>
                </IconButton>
            </div>
            <div className="stepsContainer">
                <div className='stepContainer1'>
                    <div className='stepHalf'>
                        <div className='stepText'>Step 1: Profile Picture</div>
                        <div className='profilePictureContainer2'>
                            <Avatar src={userInfo?.photoUrl} sx={{height: '100%', width: '100%'}}/>
                            <div className='editButtonContainer2'>
                                <label htmlFor="testing">
                                    <div className="editButton2">
                                        <EditIcon sx={{fontSize: 20, color: 'white'}}/>
                                    </div>
                                </label>
                                <input type="file" id="testing" style={{display: 'none'}} onChange={(e) => {handleFileRead(e)}}/>
                            </div>
                        </div>
                    </div>
                    <div className='stepHalf'>
                        <div className='stepText'>Step 2: Display Name</div>
                    </div>
                </div>
                <div className='stepContainer2'>

                </div>
            </div>
        </Card>
    </Modal>
  )
}

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    maxHeight: '80%', 
    maxWidth: '700px', 
    minWidth: '450px', 
    width: '65%', 
    overflow: 'auto',
    paddingTop: 3,
    display: 'flex',
    height: '600px',
    flexDirection: 'column',
}


export default LoginModal