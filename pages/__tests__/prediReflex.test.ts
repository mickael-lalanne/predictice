import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import PrediReflex from '~/pages/prediReflex.vue';
import ReflexGameForm from '~/components/reflex/GameForm.vue';
import ReflexGameSquare from '~/components/reflex/GameSquare.vue';
import ReflexGameResult from '~/components/reflex/GameResult.vue';

const MockVerte = {
    template: '<div></div>',
    props: ['picker', 'model'],
    emits: ['update:modelValue'],
};

const mountOptions = {
    global: {
        stubs: {
            Verte: MockVerte,
        },
    },
};

describe('PrediReflex', () => {
    it('renders game form initially', () => {
        const wrapper = mount(PrediReflex, mountOptions);

        expect(wrapper.findComponent(ReflexGameForm).exists()).toBe(true);
        expect(wrapper.findComponent(ReflexGameSquare).exists()).toBe(false);
        expect(wrapper.findComponent(ReflexGameResult).exists()).toBe(false);
    });

    it('renders game square when state is PLAYING', async () => {
        const wrapper = mount(PrediReflex, mountOptions);

        // Simulate filling in the form and starting the game
        await wrapper.findComponent(ReflexGameForm).vm.$emit('startGame');

        expect(wrapper.findComponent(ReflexGameForm).exists()).toBe(false);
        expect(wrapper.findComponent(ReflexGameSquare).exists()).toBe(true);
        expect(wrapper.findComponent(ReflexGameResult).exists()).toBe(false);
    });

    it('renders game result when square is clicked', async () => {
        const wrapper = mount(PrediReflex, mountOptions);

        // Start the game
        await wrapper.findComponent(ReflexGameForm).vm.$emit('startGame');

        // Simulate clicking on the square
        const score: number = 150;
        await wrapper
            .findComponent(ReflexGameSquare)
            .vm.$emit('squareClick', score);

        expect(wrapper.findComponent(ReflexGameForm).exists()).toBe(false);
        expect(wrapper.findComponent(ReflexGameSquare).exists()).toBe(false);
        expect(wrapper.findComponent(ReflexGameResult).exists()).toBe(true);
    });

    it('restarts the game when restart button is clicked', async () => {
        const wrapper = mount(PrediReflex, mountOptions);

        // Start the game
        await wrapper.findComponent(ReflexGameForm).vm.$emit('startGame');

        // Simulate clicking on the square to finish the game
        const score = 200;
        await wrapper
            .findComponent(ReflexGameSquare)
            .vm.$emit('squareClick', score);

        // Simulate clicking the restart button
        await wrapper.findComponent(ReflexGameResult).vm.$emit('restart');

        expect(wrapper.findComponent(ReflexGameForm).exists()).toBe(false);
        expect(wrapper.findComponent(ReflexGameSquare).exists()).toBe(true);
        expect(wrapper.findComponent(ReflexGameResult).exists()).toBe(false);
    });
});
