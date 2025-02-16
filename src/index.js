import express from 'express';
import connectDB from './config/dbConfig.js';
// import { urlencoded, json } from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { uploader, cloudinaryConfig } from './config/cloudinaryConfig.js';
import { createPostService } from './controllers/postController.js';
import './config/serverConfig.js';
import { multerUploads, dataUri } from './config/multerConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use('*', cloudinaryConfig);

app.get('/', (req,res)=>{
    return res.send('HOME PAGE');
})

app.get('/ping', (req, res) => {
    return res.json({ message: 'pong' });
});


app.post('/upload', multerUploads, async (req, res, next) => {
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

    try {
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
}, createPostService);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

