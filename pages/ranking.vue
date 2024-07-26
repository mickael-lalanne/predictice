<template>
    <div>
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
</template>

<script setup lang="ts">
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
