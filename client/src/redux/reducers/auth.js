import { LOGIN, LOGOUT } from '../constants'

const authReducer = (state = null, action) => {
    switch(action.type) {
        case LOGIN:
            if (localStorage.getItem('profile')?.result == null) {
                localStorage.setItem('profile', JSON.stringify({ ...action?.data }));   
            }
            return action?.data
        case LOGOUT:
            localStorage.clear()
            return null
        default:
            return state
    }
}

export default authReducer