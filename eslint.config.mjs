// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    // Your custom configs here
    {
        rules: {
            'vue/max-attributes-per-line': [
                'warn',
                {
                    singleline: { max: 3 },
                    multiline: { max: 1 },
                },
            ],
            'vue/html-self-closing': [
                'warn',
                {
                    html: {
                        void: 'never',
                        normal: 'never',
                        component: 'always',
                    },
                },
            ],
        },
    },
);
