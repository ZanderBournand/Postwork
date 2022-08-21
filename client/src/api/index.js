import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    
    return req;
  });

export const fetchPosts = () => API.get(`/posts`)
export const fetchUserPosts = (userId) => API.get(`/posts/user?user=${userId}`)
export const fetchUserBookmarks = (userId) => API.get(`/posts/bookmarks?bookmarks=${userId}`)
export const bookmarkPost = (postId) => API.patch(`/posts/${postId}/bookmarkPost`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const votePost = (postId, type) => API.patch(`/posts/${postId}/votePost/${type}`)
export const commentPost = (postId, comment) => API.post(`/posts/${postId}/commentPost`, comment)
export const deleteComment = (postId, commentId) => API.delete(`/posts/${postId}/commentPost/${commentId}`)
export const updateComment = (postId, commentId, comment) => API.patch(`/posts/${postId}/commentPost/${commentId}`, comment)

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const signInGoogle = (formData) => API.post('/users/signin/google', formData)
export const fetchUser = (userId) => API.get(`/users/${userId}`)
export const fetchUserProfile = (urlId) => API.get(`/users/profile/${urlId}`)
export const updateUser = (userId, userUpdates) => API.patch(`/users/update/${userId}`, userUpdates)
export const updateUserAbout = (userId, userUpdates) => API.patch(`/users/update/${userId}/about`, userUpdates)