import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import GameResult from '~/components/reflex/GameResult.vue';

describe('GameResults', () => {
    it('renders correctly with username and game result', () => {
        const username = 'Bruce Wayne';
        const gameResult = 150;

        const wrapper = mount(GameResult, {
            props: {
                username,
                gameResult,
            },
        });

        expect(wrapper.exists()).toBe(true);

        expect(wrapper.text()).toContain(username);
        expect(wrapper.text()).toContain(gameResult);
    });

    it('emits restart event when the button is clicked', async () => {
        const wrapper = mount(GameResult);

        await wrapper.find('button').trigger('click');

        expect(wrapper.emitted('restart')).toHaveLength(1);
    });
});
