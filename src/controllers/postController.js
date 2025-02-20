import { createPostService as createPostInDB} from "../services/postService.js";
import { findPostsInDB } from "../services/postService.js"; // Ensure this import is correct

export async function createPostService(req, res, next) {
    try {
        if (!req.cloudinaryResult) {
            throw new Error('No upload result found');
        }

        const post = await createPostInDB({
            caption: req.body.caption,
            imageUrl: req.cloudinaryResult.secure_url,
            cloudinaryId: req.cloudinaryResult.public_id,
            metadata: {
                format: req.cloudinaryResult.format,
                size: req.cloudinaryResult.bytes,
                dimensions: {
                    width: req.cloudinaryResult.width,
                    height: req.cloudinaryResult.height
                }
            }
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post
        });
    } catch (error) {
        next(error);
    }
}

//unimplemented return function as getAllpost
export async function findAllPosts(req, res, next) {
    try {
        const posts = await findPostsInDB();

        return res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: posts
        });
    } catch (error) {
        next(error);
    }
}
