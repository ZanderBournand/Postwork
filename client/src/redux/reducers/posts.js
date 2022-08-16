import { CREATE_POST, FETCH_ALL, UPDATE_POST } from "../constants";

const postsReducer = (state = [], action) => {
    switch(action.type) {
        case CREATE_POST:
            return [action?.payload, ...state]
        case FETCH_ALL:
            return [ ...action?.payload?.data ]
        case UPDATE_POST: 
            return state.map((post) => post._id === action.payload._id ? action.payload : post)
        default:
            return state
    }
}

export default postsReducer