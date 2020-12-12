module.exports = {
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
    },
    plugins: [
        'prettier',
    ],
    settings: {
        'import/resolver': {
            'typescript': {},
            'node': {
                'extensions': ['.js', '.ts'],
                'paths': ['node_modules/', 'node_modules/@types'],
            },
        },
    },
    rules: {
        // 'import/no-extraneous-dependencies': [2, { 'devDependencies': ['**/test.ts'] }],
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'quotes': ['error', 'single'],
    },
};
