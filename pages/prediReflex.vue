<template>
    <div>
        <div class="mb-5 flex justify-center text-lg italic">
            Predi Reflex is a game to test your rapidity :)
        </div>

        <div v-if="state === EPrediReflexState.FORM" class="max-w-[200px]">
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
                @click="startGame()"
            />
        </div>

        <div v-else-if="state === EPrediReflexState.PLAYING">
            <div
                v-if="showSquare"
                :style="squareStyle"
                class="absolute cursor-pointer select-none"
                @click="onSquareClick()"
            ></div>
        </div>

        <div v-else>
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
                @click="startGame()"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Verte from 'verte-vue3';
import 'verte-vue3/dist/verte.css';
import type { CSSProperties } from 'vue';

enum EPrediReflexState {
    FORM,
    PLAYING,
    FINISHED,
}

const SQUARE_SIZE: number = 150;

const resultList = useState<PrediReflexResult[]>(EStateKeys.PrediReflexResults);

const username = ref<string>();
const color = ref<string>('rgb(255,140,8)');
const delay = ref<number>(4); // in seconds
const state = ref<EPrediReflexState>(EPrediReflexState.FORM);
const showSquare = ref<boolean>(false);
const squareStyle = ref<CSSProperties>({});
const squareAppearedAt = ref<number>();
const gameResult = ref<number>(); // in milliseconds

const secondsLabel = computed<string>(() => (delay.value > 1 ? 'secs' : 'sec'));

const startGame = (): void => {
    state.value = EPrediReflexState.PLAYING;
    const timeoutValueInMs: number = getRandomNumber(0, delay.value) * 1000;

    setTimeout(() => {
        squareStyle.value = {
            top: `${getRandomNumber(0, window.innerHeight - SQUARE_SIZE)}px`,
            left: `${getRandomNumber(0, window.innerWidth - SQUARE_SIZE)}px`,
            width: `${SQUARE_SIZE}px`,
            height: `${SQUARE_SIZE}px`,
            backgroundColor: color.value,
        };
        showSquare.value = true;
        squareAppearedAt.value = Date.now();
    }, timeoutValueInMs);
};

const onSquareClick = (): void => {
    showSquare.value = false;
    state.value = EPrediReflexState.FINISHED;
    if (squareAppearedAt.value && username.value) {
        gameResult.value = Date.now() - squareAppearedAt.value;
        resultList.value.push({
            username: username.value,
            result: gameResult.value,
        });
    }
};
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
