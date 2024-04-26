module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/typescript',
      'prettier',
    ],
    rules: {
      'prettier/prettier': 'error',
      'semi': ['error', 'always'],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  };
  