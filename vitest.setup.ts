import { config } from '@vue/test-utils';
import type { Component } from 'vue';
import { defineComponent, h, Suspense } from 'vue';

export const MockVerte = {
    template: '<div></div>',
    props: ['picker', 'model'],
    emits: ['update:modelValue'],
};

// Wrap the component in a Suspense component to ensures that async promises in setup are resolved
// cf https://vuejs.org/guide/built-ins/suspense
export const defineAsyncComponent = (component: Component) => {
    return defineComponent({
        setup() {
            return () =>
                h(Suspense, null, {
                    default: h(component),
                });
        },
    });
};

config.global.stubs = {
    Verte: MockVerte,
};
