<template>
    <div
        class="sticky top-0 border-b border-gray-200 dark:border-gray-800 flex justify-between mb-5 bg-primary-400 dark:bg-primary-700"
    >
        <div class="flex-1"></div>

        <div class="flex justify-center space-x-4">
            <ULink
                v-for="link in links"
                :key="link.label"
                :to="link.to"
                :active="isActiveLink(link.to)"
                class="px-4 py-2"
                active-class="text-primary-100 dark:text-white underline"
                inactive-class="text-primary-900 dark:text-primary-300 hover:text-primary-200 dark:hover:text-gray-200"
            >
                {{ link.label }}
            </ULink>
        </div>

        <div class="flex-1 flex justify-end">
            <UButton
                :icon="
                    isDark
                        ? 'i-heroicons-moon-20-solid'
                        : 'i-heroicons-sun-20-solid'
                "
                color="gray"
                variant="ghost"
                aria-label="Theme"
                class="px-4"
                @click="toggleDarkMode"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = ref<boolean>(false);

onMounted(() => {
    isDark.value = colorMode.value === 'dark';
});

const toggleDarkMode = (): void => {
    isDark.value = !isDark.value;
    colorMode.preference = isDark.value ? 'dark' : 'light';
};

type Link = {
    label: string;
    to: string;
};

const links: Link[] = [
    {
        label: 'Home',
        to: '/',
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
    return (
        route.path === path
        || route.path.startsWith(`${path}/`)
        || (path === '/' && route.path.startsWith('/home'))
    );
};
</script>
