import { config, uploader } from 'cloudinary';
import { dataUri } from '../config/multerConfig.js';
// import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_CONFIG } from './serverConfig.js';

const cloudinaryConfig = (eq,res,next) => {
    config(CLOUDINARY_CONFIG);
    next();
};
    export { cloudinaryConfig, uploader };


// cloudinary.config({
//     cloud_name: 'dozd1jdjc',
//     secure: true,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// (async function() {
//     const result = await cloudinary.uploader.upload(join(__dirname, '../../images/1.png'));
//     console.log(result);
//     const url = cloudinary.url(result.public_id, {
//         transformation: [
//             {
//                 quality: "auto",
//                 fetch_format: "auto",
//             },
//             {
//                 width: 1200,
//                 height: 1200,
//                 crop: "fill",
//                 gravity: "auto",
//             }
//         ]
//     })
//     console.log(url);
// })();

export const cloudinaryUpload = async (req, res, next) => {
    try {
        console.log('After multer:', req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file received'
            });
        }

        const file = dataUri(req).content;
        const uploadOptions = {
            folder: 'imagegram/posts',
            public_id: `${Date.now()}-${req.file.originalname}`,
            access_mode: 'public',
            resource_type: 'auto',
        };

        const result = await uploader.upload(file, uploadOptions);
        req.cloudinaryResult = result;
        next();
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error uploading to cloud storage',
            error: error.message
        });
    }
};