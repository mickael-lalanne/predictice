<template>
    <div class="max-w-[200px]">
        <UFormGroup label="Player Name" class="mb-4">
            <UInput v-model="username" placeholder="Bruce Wayne" />
        </UFormGroup>

        <UFormGroup label="Color" class="mb-4">
            <Verte
                v-model="color"
                picker="square"
                model="rgb"
                @update:model-value="color = $event"
            />
        </UFormGroup>

        <UFormGroup label="Delay before preview" class="mb-4">
            <div class="flex items-end">
                <UInput
                    v-model="delay"
                    type="number"
                    class="w-[75px]"
                    min="0"
                />
                <span class="ml-2">{{ secondsLabel }}</span>
            </div>
        </UFormGroup>

        <UButton
            label="Here we go !"
            class="mt-12 p-4"
            block
            :disabled="!username || delay < 1 || !color"
            @click="() => $emit('startGame')"
        />
    </div>
</template>

<script setup lang="ts">
import Verte from 'verte-vue3';
import 'verte-vue3/dist/verte.css';

const username = defineModel('username', { type: String });
const color = defineModel('color', { type: String, required: true });
const delay = defineModel('delay', { type: Number, required: true });

const secondsLabel = computed<string>(() => (delay.value > 1 ? 'secs' : 'sec'));

defineEmits<{
    startGame: [];
}>();
</script>

<style>
.verte {
    justify-content: start;
}
.verte__guide {
    width: 50px;
    height: 50px;
}
</style>
