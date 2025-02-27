// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@nuxt/ui',
        '@nuxt/test-utils/module',
        '@nuxtjs/i18n',
    ],
    imports: {
        dirs: ['models/*.ts'],
    },
    eslint: {
        config: {
            stylistic: {
                indent: 4,
                quotes: 'single',
                semi: true,
            },
        },
    },
    i18n: {
        vueI18n: './i18n.config.ts',
    },
});
