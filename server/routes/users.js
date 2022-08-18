import express from 'express';
import { getUser, signin, signup, updateUserAbout } from '../controllers/user.js'

const router = express.Router();

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/:id', getUser)
router.patch('/update/:id/about', updateUserAbout)

export default router;