<template>
    <div>
        <UAlert
            v-if="resultsList.length === 0"
            icon="i-heroicons-exclamation-circle"
            color="blue"
            title="It seems that no one has played yet."
            description="Go ahead and be the first to challenge others!"
            class="mb-4 dark:text-white max-w-[400px]"
            data-testid="no-results-message"
        />

        <div v-else>
            <div class="flex justify-end">
                <UButton
                    label="Wan't to see an alternative ? 👀"
                    data-testid="alternative-button"
                    @click="toggleRankingMode"
                />
            </div>

            <div v-if="rankingMode === ERankingMode.LIST" data-testid="list-view">
                <div class="flex mb-6 gap-4">
                    <URadio
                        v-for="option in listOptions"
                        :key="option.value"
                        v-model="sortingOption"
                        v-bind="option"
                        data-testid="sorting-option"
                    />
                </div>

                <div v-for="(result, i) in sortedResultsList" :key="i" class="my-4">
                    <div data-testid="user-result">
                        - {{ result.username }} :
                        <span class="text-primary italic">{{ result.result }} ms</span>
                    </div>
                    <UDivider class="mt-4" />
                </div>
            </div>

            <UTable
                v-else
                :columns="tableColumns"
                :rows="resultsList"
                data-testid="table-view"
            />

            <UButton
                label="Clear results"
                class="mt-8"
                data-testid="clear-results-button"
                @click="clearResults"
            />
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

enum ERankingMode {
    LIST = 'list',
    TABLE = 'table',
}

const { $db } = useNuxtApp();

const resultsList = ref<PrediReflexResult[]>([]);
const sortingOption = ref<ESortOptions>(ESortOptions.ASC);
const rankingMode = ref<ERankingMode>(ERankingMode.LIST);

const sortedResultsList = computed<PrediReflexResult[]>(() =>
    sortArray([...resultsList.value], 'result', sortingOption.value),
);

onMounted(async () => {
    resultsList.value = await $db.results.toArray();
});

const listOptions = [
    { label: 'Best time', value: ESortOptions.ASC },
    { label: 'Dirty time', value: ESortOptions.DESC },
];

const tableColumns = [
    { label: 'Username', key: 'username' },
    { label: 'Result', key: 'result', sortable: true },
];

const toggleRankingMode = (): void => {
    rankingMode.value
        = rankingMode.value === ERankingMode.LIST
            ? ERankingMode.TABLE
            : ERankingMode.LIST;
};

const clearResults = async (): Promise<void> => {
    await $db.results.clear();
    resultsList.value = [];
};
</script>
