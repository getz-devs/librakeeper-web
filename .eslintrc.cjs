module.exports = {
    extends: ['mantine', 'plugin:@next/next/recommended', 'plugin:jest/recommended'],
    plugins: ['testing-library', 'jest'],
    overrides: [
        {
            files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:testing-library/react'],
        },
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        // 'no-multispaces': 'off',
        // 'no-trailing-spaces': 'on',
        'react/jsx-indent-props': 'off',
        'linebreak-style': 0,
        'react/react-in-jsx-scope': 'off',
        'import/extensions': 'off',
    },
};
