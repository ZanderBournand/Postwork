import { CREATE_POST, FETCH_ALL, UPDATE_POST, SEARCH_POSTS, UPDATE_BOOKMARKS} from '../constants'
import * as api from '../../api'

export const getPosts = () => async (dispatch) => {
    try {
        const { data} = await api.fetchPosts()
        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        dispatch({type: CREATE_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const bookmarkPost = (id) => async (dispatch) => {

    const currentUserId = JSON.parse(localStorage.getItem('profile'))?.result?._id

    try {
        const { data } = await api.bookmarkPost(id)
        dispatch({ type: UPDATE_BOOKMARKS, payload: data })
        dispatch({ type: UPDATE_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const votePost = (id, type) => async (dispatch) => {
    try {
        const { data } = await api.votePost(id, type)
        dispatch({ type: UPDATE_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const createComment = (id, comment) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(id, comment)
        dispatch({ type: UPDATE_POST, payload: data})
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateComment = (id, commentId, comment) => async (dispatch) => {
    try {
        const { data } = await api.updateComment(id, commentId, { body: comment })
        dispatch({ type: UPDATE_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = (id, commentId) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(id, commentId)
        dispatch({ type: UPDATE_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const searchPosts = (searchTerm) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_POSTS, payload: searchTerm })
    } catch (error) {
        console.log(error)
    }
}