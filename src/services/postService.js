import { createPost} from '../repositories/postRepository.js';

export const createPostService = async (createPostObject) => {
    //1. Take Image of post and upload on aws
    //2. Get url of image from the aws response
    //3. Create a post with caption and image url in db using repository
    //4. Return the post object

    const caption = createPostObject.caption?.trim();
    const image = createPostObject.imageUrl;
    // const user = createPostObject.user;  //late

    const post= await createPost(caption, image);
    return post;
}