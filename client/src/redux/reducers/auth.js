import { LOGIN, LOGOUT, UPDATE_USER } from '../constants'

const authReducer = (state = null, action) => {
    switch(action.type) {
        case LOGIN:
            if (localStorage.getItem('profile')?.result == null && action?.data?.result.photoUrl != null) {
                localStorage.setItem('profile', JSON.stringify({ ...action?.data }));   
            }
            return action?.data
        case LOGOUT:
            localStorage.clear()
            return null
        case UPDATE_USER: 
            const currentUser = JSON.parse(localStorage.getItem('profile'))
            if (currentUser !== null) {
                currentUser.result = action?.data
                localStorage.setItem('profile', JSON.stringify(currentUser)); 
            }
            else {
                localStorage.setItem('profile', JSON.stringify({ token: state.token, result: action?.data }));
            }
            return { ...state, result: action?.data}
        default:
            return state
    }
}

export default authReducer