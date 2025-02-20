import { createPostService as createPostInDB} from "../services/postService.js";
import { findPostsInDB, updatePostService, deletePostService } from "../services/postService.js"; // Ensure this import is correct

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
//  /api/v1/posts?limit=10&offset=0

export async function findAllPosts(req, res, next) {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        
        const result = await findPostsInDB(limit, offset);
        
        return res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export async function updatePost(req, res) {
    try {
        const post = await updatePostService(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating post",
            error: error.message
        });
    }
}

export async function deletePost(req, res) {
    try {
        const postId = req.params.id;   
        const response= await deletePostService(postId);
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting post",
            error: error.message
        });
    }
}