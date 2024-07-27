import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import GameForm from '~/components/reflex/GameForm.vue';
import { MockVerte } from '~/vitest.setup';

const mountOptions = {
    props: {
        username: 'Bruce Wayne',
        color: 'rgb(255,140,8)',
        delay: 3,
    },
};

describe('GameForm', () => {
    it('renders correctly', () => {
        const wrapper = mount(GameForm, mountOptions);

        expect(wrapper.exists()).toBe(true);
    });

    it('disables start button', async () => {
        const wrapper = mount(GameForm, mountOptions);

        // All props are correctly set, so the button should be enabled
        expect(wrapper.find('button').element.disabled).toBe(false);

        // Clear username input => button should be disabled
        await wrapper.find('input[type="text"]').setValue('');
        expect(wrapper.find('button').element.disabled).toBe(true);

        // Restore username input => button should be enabled again
        await wrapper.find('input[type="text"]').setValue(mountOptions.props.username);
        expect(wrapper.find('button').element.disabled).toBe(false);

        // Set delay value < 1 => button should be disabled
        await wrapper.find('input[type="number"]').setValue(0);
        expect(wrapper.find('button').element.disabled).toBe(true);

        // Restore delay value => button should be enabled again
        await wrapper.find('input[type="number"]').setValue(mountOptions.props.delay);
        expect(wrapper.find('button').element.disabled).toBe(false);

        // No color selected => button should be disabled
        await wrapper.findComponent(MockVerte).vm.$emit('update:modelValue', '');
        expect(wrapper.find('button').element.disabled).toBe(true);

        // Restore color value => button should be enabled again
        await wrapper.findComponent(MockVerte).vm.$emit('update:modelValue', mountOptions.props.color);
        expect(wrapper.find('button').element.disabled).toBe(false);
    });
});
