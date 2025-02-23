import { countAllPosts, createPost} from '../repositories/postRepository.js';
import { findAllPosts, updatePost, deletePost } from '../repositories/postRepository.js';
import { uploader } from '../config/cloudinaryConfig.js';
// import { findAllPosts } from '../repositories/postRepository.js';

export const createPostService = async (createPostObject) => {
    //1. Take Image of post and upload on aws
    //2. Get url of image from the aws response
    //3. Create a post with caption and image url in db using repository
    //4. Return the post object

    const caption = createPostObject.caption?.trim();
    const image = createPostObject.imageUrl;
    // const user = createPostObject.user;  //late
    const metadata = createPostObject.metadata;

    const post= await createPost(caption, image);
    return post;
}

// for getAllPostsInDB

// export const findPostsInDB = async (limit, offset) => {
//     const posts = await findAllPosts()
//     .sort({createdAt: -1})
//     .skip(Number(offset))
//     .limit(Number(limit));
//     const totalDocuments = await countAllPosts();
//     const totalPages= Math.ceil(totalDocuments/limit);

//     return {
//         posts,
//         totalPages,
//         totalDocuments
//     };
// };

export const findPostsInDB = async (limit, offset) => {
    try {
        // Convert params to numbers and ensure positive values
        const validLimit = Math.max(1, Number(limit) || 10);
        const validOffset = Math.max(0, Number(offset) || 0);

        // Get posts and total count in parallel
        const [posts, totalDocuments] = await Promise.all([
            findAllPosts(validOffset, validLimit),
            countAllPosts()
        ]);

        return {
            posts,
            pagination: {
                totalDocuments,
                totalPages: Math.ceil(totalDocuments / validLimit),
                currentPage: Math.floor(validOffset / validLimit) + 1,
                limit: validLimit
            }
        };
    } catch (error) {
        throw error;
    }
};

export const updatePostService = async (postId, data) => {
    try {
        const post = await updatePost(postId, data);
        return post;
    } catch (error) {
        throw error;
    }
};

export const deletePostService = async (postId) => {
    try {
        const post = await deletePost(postId);
        if (post.cloudinaryId) {
            await uploader.destroy(post.cloudinaryId);
        }
        return post;
    } catch (error) {
        throw error;
    }
};