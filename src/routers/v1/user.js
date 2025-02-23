import express from 'express';
import { multerUploads, dataUri } from '../../config/multerConfig.js';
import { createPostService, findAllPosts } from '../../controllers/postController.js';
import { cloudinaryConfig, uploader } from '../../config/cloudinaryConfig.js';
import { getProfile, signup } from '../../controllers/userController.js';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.get('/profile',getProfile);
router.post('/signup', validate(zodSignupSchema), signup);

export default router;

