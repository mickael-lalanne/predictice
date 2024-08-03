<template>
    <div class="flex flex-col place-items-center">
        <UCard
            v-for="post in data"
            :key="post.id"
            class="mb-5 cursor-pointer hover:outline hover:outline-1 hover:outline-primary dark:hover:outline-primary w-full md:w-11/12 lg:w-1/2"
            data-test="post-card"
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
useSeoMeta({
    title: 'Home',
    description: 'A list of the best posts.',
});

const { data } = await useFetch<Post[]>('/api/posts');

const onPostClick = async (post: Post) => {
    await navigateTo(`/home/${post.id}`);
};
</script>
