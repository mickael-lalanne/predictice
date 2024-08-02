import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import RankingPage from '~/pages/ranking.vue';

const mockResultsList: PrediReflexResult[] = [
    { username: 'Player1', result: 123 },
    { username: 'Player2', result: 456 },
];

const clearResultsMock = vi.fn();

const mockNuxtApp = (results: PrediReflexResult[]) => {
    return {
        $db: {
            results: {
                toArray: () => results,
                clear: clearResultsMock,
            },
        },
        payload: {
            serverRendered: false,
        },
    };
};

const { useNuxtAppMock } = vi.hoisted(() => {
    return {
        useNuxtAppMock: vi.fn().mockImplementation(() =>
            mockNuxtApp(mockResultsList),
        ),
    };
});

mockNuxtImport('useNuxtApp', () => useNuxtAppMock);

describe('RankingPage', () => {
    afterEach(() => {
        useNuxtAppMock.mockRestore();
    });

    it('toggles ranking mode on button click', async () => {
        const wrapper = mount(RankingPage);
        await flushPromises();

        const button = wrapper.find('[data-test="alternative-button"]');

        await button.trigger('click');
        expect(wrapper.find('[data-test="table-view"]').exists()).toBe(true);

        await button.trigger('click');
        expect(wrapper.find('[data-test="list-view"]').exists()).toBe(true);
    });

    it('sorts the results list correctly', async () => {
        useNuxtAppMock.mockImplementation(() => {
            return mockNuxtApp(mockResultsList);
        });

        const wrapper = mount(RankingPage);
        await flushPromises();
        const radios = wrapper.findAll('[data-test="sorting-option"]');

        await radios[1].setValue('desc');
        expect(wrapper.find('[data-test="user-result"]').text()).toContain(
            'Player2',
        );

        await radios[0].setValue('asc');
        expect(wrapper.find('[data-test="user-result"]').text()).toContain(
            'Player1',
        );
    });

    it('displays a message when there are no results', async () => {
        useNuxtAppMock.mockImplementation(() => {
            return mockNuxtApp([]);
        });

        const wrapper = mount(RankingPage);

        expect(wrapper.find('[data-test="no-results-message"]').exists()).toBe(true);
    });

    it('clears the results list', async () => {
        useNuxtAppMock.mockImplementation(() => {
            return mockNuxtApp(mockResultsList);
        });

        const wrapper = mount(RankingPage);
        await flushPromises();

        expect(clearResultsMock).toHaveBeenCalledTimes(0);
        const button = wrapper.find('[data-test="clear-results-button"]');

        await button.trigger('click');
        expect(clearResultsMock).toHaveBeenCalledOnce();
        expect(wrapper.find('[data-test="no-results-message"]').exists()).toBe(true);
    });
});
