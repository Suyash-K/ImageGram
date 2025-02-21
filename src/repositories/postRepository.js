import Post from "../schema/post.js";
import mongoose from 'mongoose';


export const createPost = async (caption, image, user) => {
    try {
        const newPost = await Post.create({ caption, image, user });
        return newPost;
    } catch (error) {
        console.log(error);
    }
}


export const findAllPosts = async (offset = 0, limit = 10) => {
    try {
        const posts = await Post.find()
            .skip(offset)
            .limit(limit)
            .sort({ createdAt: -1 })
            .exec();
        return posts;
    } catch (error) {
        throw error;
    }
};

export const updatePost = async (postId, data) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new Error('Invalid post ID');
        }
        
        const post = await Post.findByIdAndUpdate(
            postId,
            { $set: data },
            { new: true }
        );
        
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new Error('Invalid post ID');
        }

        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (error) {
        throw error;
    }
};

export const countAllPosts = async () => {
    try {
        return await Post.countDocuments();
    } catch (error) {
        throw error;
    }
};

export const findPostById = async (id) => {
    try {
        const post = await Post.findById(id);
        return post;
    } catch (error) {
        console.log(error);
    }
}