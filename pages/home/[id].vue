<template>
    <UContainer class="w-1/2">
        <UAlert
            v-if="status === 'error'"
            icon="i-heroicons-exclamation-circle"
            color="red"
            title="An error occurred while fetching the post."
            :description="error?.message"
            class="mb-4"
        />

        <div v-else>
            <USkeleton v-if="status === 'pending'" class="h-6 w-full" />
            <div v-else-if="post" class="text-primary flex justify-center">
                You are currently reading the post : #{{ post.id }}
            </div>

            <UDivider label="Title" class="my-4" />
            <USkeleton v-if="status === 'pending'" class="h-6 w-full" />
            <div v-else-if="post">
                {{ post.title }}
            </div>

            <UDivider label="Description" class="my-4" />
            <USkeleton v-if="status === 'pending'" class="h-12 w-full" />
            <div v-else-if="post">
                {{ post.body }}
            </div>
        </div>
    </UContainer>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Home - Post details',
    description: 'Details of a post.',
});

const route = useRoute();

const { status, data: post, error } = useLazyFetch<Post>(`/api/post/${route.params.id}`);
</script>
