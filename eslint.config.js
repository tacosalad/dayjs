import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        dayjs: 'readonly',
        console: 'readonly',
        process: 'readonly',
        BigInt: 'readonly',
        // Jest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly'
      }
    },
    rules: {
      // Essential rules that match original .eslintrc.json
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'no-param-reassign': 'off',
      'func-names': 'off',
      
      // Core ESLint rules that are important
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      'no-undef': 'error',
      'no-redeclare': 'off', // Some test files redefine globals intentionally
      'no-unreachable': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-obj-calls': 'error',
      'no-sparse-arrays': 'error',
      'no-unexpected-multiline': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      
      // Style rules that are less strict
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'eol-last': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-trailing-spaces': 'error',
      
      // ES6+ rules
      'no-const-assign': 'error',
      'no-dupe-class-members': 'error',
      'no-var': 'error',
      'prefer-const': 'error'
    }
  },
  {
    // Test files specific configuration (ESM)
    files: ['test/**/*.js', '**/*.test.js', '**/*.spec.js'],
    ignores: ['test/__mocks__/**'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        global: 'writable',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        console: 'readonly',
        BigInt: 'readonly',
        require: 'readonly' // Allow require in tests for compatibility
      }
    }
  },
  {
    // Test mock files (CommonJS) - special handling
    files: ['test/__mocks__/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly'
      }
    }
  }
]