import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import RankingPage from '~/pages/ranking.vue';

const mockResultsList: PrediReflexResult[] = [
    { username: 'Player1', result: 123 },
    { username: 'Player2', result: 456 },
];

const { useStateMock } = vi.hoisted(() => {
    return {
        useStateMock: vi.fn().mockImplementation(() => {
            return { value: mockResultsList };
        }),
    };
});

mockNuxtImport('useState', () => useStateMock);

describe('RankingPage', () => {
    afterEach(() => {
        useStateMock.mockRestore();
    });

    it('toggles ranking mode on button click', async () => {
        const wrapper = mount(RankingPage);
        const button = wrapper.find('[data-test="alternative-button"]');

        await button.trigger('click');
        expect(wrapper.find('[data-test="table-view"]').exists()).toBe(true);

        await button.trigger('click');
        expect(wrapper.find('[data-test="list-view"]').exists()).toBe(true);
    });

    it('sorts the results list correctly', async () => {
        useStateMock.mockImplementation(() => {
            return { value: mockResultsList };
        });

        const wrapper = mount(RankingPage);
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
        useStateMock.mockImplementation(() => {
            return [];
        });

        const wrapper = mount(RankingPage);

        expect(wrapper.find('[data-test="no-results-message"]').exists()).toBe(true);
    });
});
