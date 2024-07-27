import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import GameSquare from '~/components/reflex/GameSquare.vue';

describe('GameSquare', () => {
    const delay = 3;
    const color = 'rgb(255,140,8)';

    const mountOptions = {
        props: {
            delay,
            color,
        },
    };

    it('shows a square after the delay', async () => {
        const wrapper = mount(GameSquare, mountOptions);

        // The square should not be shown initially
        expect(wrapper.find('[data-test="square"]').exists()).toBe(false);

        // Wait for the square to be displayed
        await new Promise(resolve => setTimeout(resolve, delay * 1000));

        expect(wrapper.find('[data-test="square"]').exists()).toBe(true);
    });

    it('emits squareClick event with a score when clicked', async () => {
        const wrapper = mount(GameSquare, mountOptions);

        // Wait for the square to be displayed
        await new Promise(resolve => setTimeout(resolve, delay * 1000));

        // Click the square
        await wrapper.find('div').trigger('click');

        // Check if the squareClick event was emitted with a score
        expect(wrapper.emitted().squareClick[0]).toEqual([expect.any(Number)]);
    });
});
