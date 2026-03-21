import express from 'express';
import { deletePost, sharePost, updatePost } from '../contollers/PostController.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/post-share', protect, sharePost);
router.put('/post-update/:id', protect, updatePost);
router.delete('/post-delete/:id', protect, deletePost);

export default router;