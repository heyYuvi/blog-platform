import express from 'express';
import { deletePost, getPost, sharePost, singlePost, updatePost } from '../contollers/PostController.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/post-share', protect, sharePost);
router.put('/post-update/:id', protect, updatePost);
router.delete('/post-delete/:id', protect, deletePost);
router.get('/post-get', protect, getPost);
router.get('/post-getSingle/:id', protect, singlePost);

export default router;