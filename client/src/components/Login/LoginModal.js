import React, {useState} from 'react'
import {Card, Modal, IconButton, Avatar, TextField, Checkbox, Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import './Login.css'
import PlacesAutoComplete, {
  geocodeByADdress,
  getLatLng
} from "react-places-autocomplete"
import { EggTwoTone } from '@mui/icons-material';
import { updateUser } from '../../redux/actions/auth';

const LoginModal = ({ isOpen, setModalOpen, }) => {

  const currentUser = useSelector((state) => state.auth)?.result

  const dispatch = useDispatch()

  const handleClose = () => setModalOpen(false);

  const [userInfo, setUserInfo] = useState({
    photoUrl: null,
    location: '',
    about: '',
    recruiter: false
  })

  const isValidForm = userInfo.photoUrl !== null && userInfo.location?.length > 0 && userInfo.about?.length > 0

  const handleSelect = async (value) => {
    setUserInfo({...userInfo, location: value})
  }

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

  const handleSubmit = () => {
    dispatch(updateUser(currentUser?._id, userInfo))
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
                    <div className='stepHalf1'>
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
                    <div className='stepHalf2'>
                        <div className='stepText'>Step 2: Your Location</div>
                        <div className='autoCompleteContainer'>
                          <PlacesAutoComplete
                            value={userInfo?.location}
                            onChange={(e) => {setUserInfo({ ...userInfo, location: e})}}
                            searchOptions={{ types: ['locality', 'country'] }}
                            onSelect={handleSelect}
                          >
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <>
                              <TextField 
                                {...getInputProps({ placeholder: "Find your location..."})}
                                InputProps={{
                                  endAdornment: (
                                    <SearchIcon />
                                  ),
                                }}
                              />
                              <div className='suggestionsContainer'>
                                {suggestions.slice(0, 3).map(suggestion => {
                                  const style = {
                                    padding: 10,
                                    backgroundColor: suggestion.active ? "#F9F9F9" : "#fff",
                                  };

                                  return (
                                    <div className="individualSuggestion" key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { style })}>
                                      {suggestion.description}
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          )}
                          </PlacesAutoComplete>
                        </div>
                    </div>
                </div>
                <div className='stepContainer2'>
                  <div className="step">
                    <div className='stepText'>Step 3: About You</div>
                    <div className="aboutYoucontainer">
                      <TextField 
                        sx={{width: '100%'}} 
                        multiline
                        rows={5}
                        id="standard-basic" 
                        placeholder="Tell us about yourself..." 
                        variant="outlined"
                        onChange={(e) => setUserInfo({...userInfo, about: e.target.value})}
                        value = {userInfo?.about}
                      />
                    </div>
                  </div>
                  <div className="checkboxContainer">
                    <Checkbox
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 30, paddingLeft: 0 } }}
                        checked={userInfo.recruiter}
                        onChange={() => setUserInfo({...userInfo, recruiter: !userInfo.recruiter})}
                    />
                    <div className="checkboxText">Are you a recruiter / employer ?</div>
                </div>
                </div>
            </div>
            <div className="bottomContainer">
              <div className='submitButtonsContainer'>
                <Button variant="contained" sx={{textTransform: 'none', height: '50px', paddingLeft: '20px', paddingRight: '20px', fontWeight: 'bold', fontSize: '16px', marginRight: '10px', color: '#585858', backgroundColor: '#F1F1F1', boxShadow: 'none', borderRadius: '10px', "&:hover": { backgroundColor: '#F1F1F1', boxShadow: 'none', }}} onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="contained" sx={{textTransform: 'none', height: '50px', paddingLeft: '20px', paddingRight: '20px', fontWeight: 'bold', fontSize: '16px', borderRadius: '10px'}} onClick={handleSubmit} disabled={!isValidForm}>
                  Save Profile
                </Button>
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