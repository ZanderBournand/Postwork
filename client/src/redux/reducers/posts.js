import { getHotValue } from "../../services/helpers";
import { CREATE_POST, FETCH_ALL, UPDATE_POST, SEARCH_POSTS, UPDATE_BOOKMARKS, CHANGE_POSTS_TYPE, POSTS_LOADING } from "../constants";

const postsReducer = (state = {type: 'hot', loading: false, posts: [], hotPosts: [], newPosts: [], searchTerm: '', bookmarkedPosts: [], profilePosts: []}, action) => {

    const currentUserId = JSON.parse(localStorage.getItem('profile'))?.result?._id

    switch(action.type) {
        case CREATE_POST:
            return {...state, posts: [action?.payload, ...state.posts], hotPosts: [action?.payload, ...state.hotPosts], newPosts: [action?.payload, ...state.newPosts]}
        case FETCH_ALL:
            return {
                ...state,
                newPosts: [ ...action?.payload?.data ],
                hotPosts: [ ...action?.payload?.data.sort((a, b) => (getHotValue(a?.votesCount, new Date(a?.timestamp)) > getHotValue(b?.votesCount, new Date(b?.timestamp))) ? -1 : 1) ],
                posts: [ ...action?.payload?.data.sort((a, b) => (getHotValue(a?.votesCount, new Date(a?.timestamp)) > getHotValue(b?.votesCount, new Date(b?.timestamp))) ? -1 : 1) ],
                bookmarkedPosts: action?.payload?.data.filter((post) => post.bookmarks.includes(currentUserId)).sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
            }
        case UPDATE_POST: 
            return { 
                ...state, 
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post),
                hotPosts:  state.hotPosts.map((post) => post._id === action.payload._id ? action.payload : post),
                newPosts:  state.newPosts.map((post) => post._id === action.payload._id ? action.payload : post),
                bookmarkedPosts: state.bookmarkedPosts.map((post) => post._id === action.payload._id ? action.payload : post)
            }
        case CHANGE_POSTS_TYPE:
            if (action.mode === 'hot') {
                return { ...state, type: 'hot', posts: state.hotPosts}
            }
            else if (action.mode === 'new') {
                return { ...state, type: 'new', posts: state.newPosts }
            }
            else if (action.mode === 'bookmarks') {
                return { ...state, type: 'bookmarks', posts: state.bookmarkedPosts }
            }
            else if (action.mode === 'profile') {
                return { ...state, type: 'profile', profilePosts: action.payload, posts: action.payload}
            }
        case SEARCH_POSTS:
            if (action?.payload === '' || action?.payload === null) {
                if (state.type === 'hot') {
                    return { ...state, posts: state.hotPosts }
                }
                else if (state.type === 'new') {
                    return { ...state, posts: state.newPosts }
                }
                else if (state.type === 'bookmarks') {
                    return { ...state, posts: state.bookmarkedPosts } 
                }
                else if (state.type === 'profile') {
                    return { ...state, posts: state.profilePosts } 
                }
            }
            else {
                if (state.type === 'hot') {
                    return { ...state, posts: state.hotPosts.filter((post) => post?.title.toLowerCase().includes(action?.payload) || post?.tag.toLowerCase().includes(action?.payload))}
                }
                else if (state.type === 'new') {
                    return { ...state, posts: state.newPosts.filter((post) => post?.title.toLowerCase().includes(action?.payload) || post?.tag.toLowerCase().includes(action?.payload))}
                }
                else if (state.type === 'bookmarks') {
                    return { ...state, posts: state.bookmarkedPosts.filter((post) => post?.title.toLowerCase().includes(action?.payload) || post?.tag.toLowerCase().includes(action?.payload))}
                }
                else if (state.type === 'profile') {
                    return { ...state, posts: state.profilePosts.filter((post) => post?.title.toLowerCase().includes(action?.payload) || post?.tag.toLowerCase().includes(action?.payload))}
                }
            }
        case UPDATE_BOOKMARKS:
            if (action?.payload.bookmarks.includes(currentUserId)) {
                return { ...state, bookmarkedPosts: [ action?.payload, ...state.bookmarkedPosts ]}
            }
            else {
                return { ...state, bookmarkedPosts: state.bookmarkedPosts.filter((post) => post?._id !== action?.payload?._id )}
            }
        case POSTS_LOADING:
            return { ...state, loading: action.loading }
        default:
            return state
    }
}

export default postsReducer