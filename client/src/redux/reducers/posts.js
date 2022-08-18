import { getHotValue } from "../../services/helpers";
import { CREATE_POST, FETCH_ALL, UPDATE_POST, SORT_POSTS_HOT, SORT_POSTS_NEW, SEARCH_POSTS, UPDATE_BOOKMARKS } from "../constants";

const postsReducer = (state = {type: 'hot', posts: [], hotPosts: [], newPosts: [], searchTerm: '', bookmarkedPosts: []}, action) => {

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
            }
        case SORT_POSTS_HOT:
            return { ...state, type: 'hot', posts: state.hotPosts}
        case SORT_POSTS_NEW:
            return { ...state, type: 'new', posts: state.newPosts }
        case SEARCH_POSTS:
            if (action?.payload === '' || action?.payload === null) {
                return { ...state, posts: (state.type === 'hot') ? state.hotPosts : state.newPosts }
            }
            else {
                if (state.type === 'hot') {
                    return { ...state, posts: state.hotPosts.filter((post) => post?.title.toLowerCase().includes(action?.payload) || post?.tag.toLowerCase().includes(action?.payload))}
                }
                else {
                    return { ...state, posts: state.newPosts.filter((post) => post?.title.toLowerCase().includes(action?.payload) || post?.tag.toLowerCase().includes(action?.payload))}
                }
            }
        case UPDATE_BOOKMARKS:
            if (action?.payload.bookmarks.includes(currentUserId)) {
                return { ...state, bookmarkedPosts: [ action?.payload, ...state.bookmarkedPosts ]}
            }
            else {
                return { ...state, bookmarkedPosts: state.bookmarkedPosts.filter((post) => post?._id !== action?.payload?._id )}
            }
        default:
            return state
    }
}

export default postsReducer