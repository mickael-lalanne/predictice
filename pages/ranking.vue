<template>
    <div>
        <UAlert
            v-if="resultsList.length === 0"
            icon="i-heroicons-exclamation-circle"
            color="blue"
            title="It seems that no one has played yet."
            description="Go ahead and be the first to challenge others!"
            class="mb-4 dark:text-white max-w-[400px]"
        />

        <div v-else>
            <div class="flex mb-6">
                <URadio
                    v-for="option in options"
                    :key="option.value"
                    v-model="sortingOption"
                    v-bind="option"
                    class="ml-4"
                />
            </div>

            <div v-for="(result, i) in sortedResultsList" :key="i" class="my-4">
                <div>
                    - {{ result.username }} :
                    <span class="text-primary italic">{{ result.result }} ms</span>
                </div>
                <UDivider class="mt-4" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Ranking',
    description: 'Challenge others and become the best.',
});

enum ESortOptions {
    ASC = 'asc',
    DESC = 'desc',
}

const resultsList = useState<PrediReflexResult[]>(
    EStateKeys.PrediReflexResults,
);

const sortingOption = ref<ESortOptions>(ESortOptions.ASC);

const sortedResultsList = computed<PrediReflexResult[]>(() =>
    sortArray([...resultsList.value], 'result', sortingOption.value),
);

const options = [
    { label: 'Best time', value: ESortOptions.ASC },
    { label: 'Dirty time', value: ESortOptions.DESC },
];
</script>
