<template>
    <NuxtLayout>
        <AppHeader />
        <div class="mx-10">
            <NuxtPage />
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
useState<PrediReflexResult[]>(EStateKeys.PrediReflexResults, () => []);
</script>
