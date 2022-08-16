import { CREATE_POST, FETCH_ALL, UPDATE_POST } from '../constants'
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
    try {
        const { data } = await api.bookmarkPost(id)
        console.log(data)
        dispatch({ type: UPDATE_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const votePost = (id, type) => async (dispatch) => {
    try {
        const { data } = await api.votePost(id, type)
        console.log(data)
        dispatch({ type: UPDATE_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}