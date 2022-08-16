import express from 'express';
import { getPosts, getPostsByUser, getBookmarksByUser, bookmarkPost, createPost, votePost, commentPost, deleteComment, updateComment } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getPosts)
router.get('/user', getPostsByUser)
router.get('/bookmarks', getBookmarksByUser)
router.patch('/:id/bookmarkPost', auth, bookmarkPost);
router.post('/', auth, createPost)
router.patch('/:id/votePost/:type', auth, votePost);
router.post('/:id/commentPost', auth, commentPost);
router.delete('/:id/commentPost/:commentId', auth, deleteComment);
router.patch('/:id/commentPost/:commentId', auth, updateComment);

export default router;