import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { log } from "console";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

cloudinary.config({
    cloud_name: 'dozd1jdjc',
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

(async function() {
    const result = await cloudinary.uploader.upload(join(__dirname, '../../images/1.png'));
    console.log(result);
    const url = cloudinary.url(result.public_id, {
        transformation: [
            {
                quality: "auto",
                fetch_format: "auto",
            },
            {
                width: 1200,
                height: 1200,
                crop: "fill",
                gravity: "auto",
            }
        ]
    })
    console.log(url);
})();