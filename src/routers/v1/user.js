import express from 'express';
import { multerUploads, dataUri } from '../../config/multerConfig.js';
import { createPostService, findAllPosts } from '../../controllers/postController.js';
import { cloudinaryConfig, uploader } from '../../config/cloudinaryConfig.js';
import { getProfile,signin, signup } from '../../controllers/userController.js';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.get('/profile',getProfile);
router.post('/signup', validate(zodSignupSchema), signup);
router.post('/signin', validate(zodSigninSchema), signin);

export default router;

