import { BASE_URL } from '../../config';
import type { Post } from '~/models/Post';

export default defineEventHandler(async (event) => {
    const postId = getRouterParam(event, 'postId');

    // Simulate a 2s delay to show the loading state in the UI
    await new Promise(resolve => setTimeout(resolve, 2000));

    return await $fetch<Post>(`${BASE_URL}/posts/${postId}`);
});
