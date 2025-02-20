import express from 'express';
import { multerUploads, dataUri } from '../../config/multerConfig.js';
import { createPostService, findAllPosts } from '../../controllers/postController.js';
import { cloudinaryConfig, uploader } from '../../config/cloudinaryConfig.js';
import { getProfile } from '../../controllers/userController.js';

const router = express.Router();

router.get('/profile',getProfile);


export default router;

