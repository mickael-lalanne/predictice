<template>
    <div class="flex flex-col items-center">
        <div class="mb-12 text-lg italic">
            Predi Reflex is a game to test your rapidity :)
        </div>

        <ReflexGameForm
            v-if="state === EPrediReflexState.FORM"
            v-model:username="username"
            v-model:delay="delay"
            v-model:color="squareColor"
            @start-game="() => (state = EPrediReflexState.PLAYING)"
        />

        <ReflexGameSquare
            v-else-if="state === EPrediReflexState.PLAYING"
            :delay="delay"
            :color="squareColor"
            @square-click="onSquareClick"
        />

        <ReflexGameResult
            v-else
            :username="username"
            :game-result="gameResult"
            @restart="() => (state = EPrediReflexState.PLAYING)"
        />
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Predi Reflex',
    description: 'Test your rapidity !',
});

enum EPrediReflexState {
    FORM,
    PLAYING,
    FINISHED,
}

const resultList = useState<PrediReflexResult[]>(EStateKeys.PrediReflexResults);

const state = ref<EPrediReflexState>(EPrediReflexState.FORM);
const username = ref<string>();
const squareColor = ref<string>('rgb(0,125,255)');
const delay = ref<number>(4); // in seconds
const gameResult = ref<number>(); // in milliseconds

const onSquareClick = (score: number): void => {
    state.value = EPrediReflexState.FINISHED;
    gameResult.value = score;

    if (username.value) {
        resultList.value.push({
            username: username.value,
            result: score,
        });
    }
};
</script>
