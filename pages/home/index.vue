<template>
    <div class="flex flex-col place-items-center">
        <UCard
            v-for="post in data"
            :key="post.id"
            class="mb-5 cursor-pointer dark:hover:outline dark:hover:outline-1 dark:hover:outline-primary w-1/2"
            @click="onPostClick(post)"
        >
            <template #header>
                <div class="flex justify-between">
                    <span class="text-xl">{{ post.title }}</span>
                    <span class="text-primary">{{ post.id }}</span>
                </div>
            </template>

            <span class="text-base">
                {{ post.body }}
            </span>
        </UCard>
    </div>
</template>

<script setup lang="ts">
const { data } = await useFetch<Post[]>('/api/posts');

const onPostClick = async (post: Post) => {
    await navigateTo(`/home/${post.id}`);
};
</script>
