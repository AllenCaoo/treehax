import express from 'express';
import {getPosts, createPost} from '../controllers/oh.js';

// router "manager" that handles requests going through localhost:5000/oh
const router = express.Router();

// localhost:5000/posts bc of the app.use('/posts', postRoutes) in index.js
// getPosts is the server response function to the get request
router.get('/', getPosts)
// createPost is the server response function to the post request
router.post('/', createPost)

export default router;