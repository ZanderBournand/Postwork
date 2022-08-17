import { getHotValue } from "../../services/helpers";
import { CREATE_POST, FETCH_ALL, UPDATE_POST, SORT_POSTS_HOT, SORT_POSTS_NEW } from "../constants";

const postsReducer = (state = {type: 'hot', posts: []}, action) => {
    switch(action.type) {
        case CREATE_POST:
            return {...state, posts: [action?.payload, ...state]}
        case FETCH_ALL:
            // return action?.payload?.data.sort((a, b) => (getHotValue(a?.votesCount, new Date(a?.timestamp)) > getHotValue(b?.votesCount, new Date(b?.timestamp))) ? -1 : 1)
            if (state.type === 'hot') {
                return { ...state, posts: [ ...action?.payload?.data.sort((a, b) => (getHotValue(a?.votesCount, new Date(a?.timestamp)) > getHotValue(b?.votesCount, new Date(b?.timestamp))) ? -1 : 1)]}
            }
            else {
                return {...state, posts: [ ...action?.payload?.data ]}
            }
        case UPDATE_POST: 
            return { ...state, posts: state.map((post) => post._id === action.payload._id ? action.payload : post)}
        case SORT_POSTS_HOT:
            return { type: 'hot', posts: [ ...state.posts.sort((a, b) => (getHotValue(a?.votesCount, new Date(a?.timestamp)) > getHotValue(b?.votesCount, new Date(b?.timestamp))) ? -1 : 1)]}
        case SORT_POSTS_NEW:
            return { type: 'new', posts: [ ...state.posts.sort((a, b) => (new Date(a?.timestamp) >new Date(b?.timestamp)) ? -1: 1) ]}
        default:
            return state
    }
}

export default postsReducer