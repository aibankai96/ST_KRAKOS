module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    serviceworker: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['tests/**', 'public/**', 'scripts/**', 'node_modules/**'],
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-undef': 'error',
    'no-unreachable': 'error',
    'no-return-await': 'error',
    'prefer-const': 'warn',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'never'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'object-curly-spacing': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-blocks': 'error',
    'keyword-spacing': 'error',
    'space-infix-ops': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }]
  },
  globals: {
    self: 'readonly',
    caches: 'readonly',
    fetch: 'readonly',
    importScripts: 'readonly',
    skipWaiting: 'readonly',
    clients: 'readonly'
  }
}

