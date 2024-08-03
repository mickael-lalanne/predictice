import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
    // any custom Vitest config you require
    test: {
        environment: 'nuxt',
        setupFiles: './vitest.setup.ts',
        exclude: ['**/e2e/**', '**/node_modules/**'],
    },
});
