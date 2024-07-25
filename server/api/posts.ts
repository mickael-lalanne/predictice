import { BASE_URL } from '../config';

export default defineEventHandler(async () => {
    const posts = await $fetch<Post[]>(`${BASE_URL}/posts`);

    return posts.slice(0, 5);
});
