<template>
    <div
        v-if="showSquare"
        :style="squareStyle"
        class="absolute cursor-pointer select-none"
        @click="onSquareClick"
        data-test="square"
    ></div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

const showSquare = ref<boolean>(false);
const squareStyle = ref<CSSProperties>({});
const squareAppearedAt = ref<number>();

const SQUARE_SIZE: number = 150;

const props = defineProps<{
    delay: number;
    color: string;
}>();

const emit = defineEmits<{
    squareClick: [score: number];
}>();

onMounted(() => {
    const timeoutValueInMs: number = getRandomNumber(0, props.delay) * 1000;

    setTimeout(() => {
        squareStyle.value = {
            top: `${getRandomNumber(0, window.innerHeight - SQUARE_SIZE)}px`,
            left: `${getRandomNumber(0, window.innerWidth - SQUARE_SIZE)}px`,
            width: `${SQUARE_SIZE}px`,
            height: `${SQUARE_SIZE}px`,
            backgroundColor: props.color,
        };
        showSquare.value = true;
        squareAppearedAt.value = Date.now();
    }, timeoutValueInMs);
});

const onSquareClick = (): void => {
    showSquare.value = false;
    if (squareAppearedAt.value) {
        emit('squareClick', Date.now() - squareAppearedAt.value);
    }
};
</script>
