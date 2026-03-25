import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { addPostComment, deleteComment, getComments, updateComment } from '../contollers/CommentController.js';

const router = express.Router()

router.post('/post-comment', protect, addPostComment);
router.get('/post-comments/:id', protect, getComments);
router.put('/post-comment-update/:id', protect, updateComment);
router.delete('/post-comment-delete/:id', protect, deleteComment);

export default router;