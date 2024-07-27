import { config } from '@vue/test-utils';

export const MockVerte = {
    template: '<div></div>',
    props: ['picker', 'model'],
    emits: ['update:modelValue'],
};

config.global.stubs = {
    Verte: MockVerte,
};
