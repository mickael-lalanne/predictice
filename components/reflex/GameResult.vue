<template>
    <div>
        <div class="text-center mt-20 mb-4">
            Congratulations {{ username }} !
        </div>

        <div class="mb-20 text-center">
            You clicked after :
            <span class="text-primary text-xl font-bold ml-6">
                {{ gameResult }} milliseconds
            </span>
        </div>

        <UButton
            label="Restart"
            class="mt-12 p-4"
            block
            @click="() => $emit('restart')"
        />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    username?: string;
    gameResult?: number;
}>();

defineEmits<{
    restart: [];
}>();
</script>
