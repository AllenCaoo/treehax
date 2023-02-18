import express from 'express';
import {getPosts, createPost} from '../controllers/exercises.js';

const router = express.Router();

// localhost:5000/posts bc of the app.use('/posts', postRoutes) in index.js
router.get('/', getPosts)
router.post('/', createPost)

export default router;