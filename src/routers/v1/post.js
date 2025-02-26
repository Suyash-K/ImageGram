// all the post related routes will be here

import express from 'express';
import { multerUploads, dataUri } from '../../config/multerConfig.js';
import { createPostService, findAllPosts, updatePost, deletePost } from '../../controllers/postController.js';
import { cloudinaryUpload, uploader } from '../../config/cloudinaryConfig.js';

const router = express.Router();

// Add debugging middleware
// router.use((req, res, next) => {
//     console.log('Request body:', req.body);
//     console.log('Request files:', req.files);
//     console.log('Request file:', req.file);
//     next();
// });

router.get('/', findAllPosts);
router.post('/', multerUploads, cloudinaryUpload, createPostService);

router.patch('/:id', updatePost);
router.delete('/:id', deletePost);


// router.post('/', multerUploads, async (req, res, next) => {
//     console.log('After multer:', req.file); // Debug log

//     if (!req.file) {
//         return res.status(400).json({
//             success: false,
//             message: 'No file received'
//         });
//     }

//     const file = dataUri(req).content;
//     const uploadOptions = {
//         folder: 'imagegram/posts',
//         public_id: `${Date.now()}-${req.file.originalname}`,
//         access_mode: 'public',
//         resource_type: 'auto',
//     };

//     try {
//         const result = await uploader.upload(file, uploadOptions);
//         req.cloudinaryResult = result;
//         next();
//     } catch (error) {
//         console.error('Cloudinary upload error:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Error uploading to cloud storage',
//             error: error.message
//         });
//     }
// }, createPostService);

// router.post('/', multerUploads, async (req, res, next) => {
//     try {
//         console.log('After multer:', req.file); // Debug log

//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'No file received. Please ensure you are sending an image file with field name "image"'
//             });
//         }

//         const file = dataUri(req).content;
//         const uploadOptions = {
//             folder: 'imagegram/posts',
//             public_id: `${Date.now()}-${req.file.originalname}`,
//             access_mode: 'public',
//             resource_type: 'auto',
//         };

//         const result = await uploader.upload(file, uploadOptions);
//         req.cloudinaryResult = result;
//         next();
//     } catch (error) {
//         console.error('Upload error:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Error processing upload',
//             error: error.message
//         });
//     }
// }, createPostService);

// router.post('/', multerUploads, cloudinaryUploadMiddleware, createPostService);
// router.post('/post', findAllPosts);


// router.post('/', multerUploads, createPost);

export default router;