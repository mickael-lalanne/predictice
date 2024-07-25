<template>
    <div
        class="border-b border-gray-200 dark:border-gray-800 flex justify-center mb-5"
    >
        <ULink
            v-for="link in links"
            :key="link.label"
            :to="link.to"
            :active="isActiveLink(link.to)"
            class="px-4 py-2"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
            {{ link.label }}
        </ULink>
    </div>
</template>

<script setup lang="ts">
type Link = {
    label: string;
    to: string;
};

const links: Link[] = [
    {
        label: 'Home',
        to: '/home',
    },
    {
        label: 'PrediReflex',
        to: '/prediReflex',
    },
    {
        label: 'Ranking',
        to: '/ranking',
    },
];

const route = useRoute();

const isActiveLink = (path: string) => {
    return route.path === path || route.path.startsWith(`${path}/`);
};
</script>
