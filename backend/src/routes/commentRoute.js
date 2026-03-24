import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { addPostComment, getComments } from '../contollers/CommentController.js';

const router = express.Router()

router.post('/post-comment', protect, addPostComment);
router.get('/post-comments/:id', protect, getComments);

export default router;