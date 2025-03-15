import express from 'express';
import connectDB from './config/dbConfig.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { uploader, cloudinaryConfig } from './config/cloudinaryConfig.js';
import './config/serverConfig.js';
import postRouter from './routers/v1/post.js';
import userRouter from './routers/v1/user.js';
import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './utils/swaggerOptions.js';
import rateLimit from 'express-rate-limit';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const app = express();

const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, // 30 seconds
    max: 5 // limit each IP to 5 requests per windowMs
});

app.use(limiter); // apply rate limiter to all requests

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use('*', cloudinaryConfig);

app.use('/posts', postRouter);

app.use('/api/v1/users', userRouter);

const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "ImageGram API Documentation"
}));

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

app.get('/', (req,res)=>{
    return res.send('HOME PAGE');
})

app.get('/ping', (req, res) => {
    console.log(req.user);
    return res.json({ message: 'pong' });
});


// app.post('/upload', multerUploads, async (req, res, next) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

