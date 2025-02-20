import Post from "../schema/post.js";

export const createPost = async (caption, image, user) => {
    try {
        const newPost = await Post.create({ caption, image, user });
        return newPost;
    } catch (error) {
        console.log(error);
    }
}

export const findAllPosts = async (offset, limit) => {
    try {
        const posts = await Post.find({}).populate('user', 'username email');
        return posts;
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = async (postId, data) => {
    try {
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $set: {
                    caption: data.caption
                }
            },
            { new: true }
        );
        return post;
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        const post = await Post.findByIdAndDelete(postId);
        return post;
    } catch (error) {
        throw error;
    }
};

export const countAllPosts = () => {
    return Post.countDocuments();
};

export const findPostById = async (id) => {
    try {
        const post = await Post.findById(id);
        return post;
    } catch (error) {
        console.log(error);
    }
}