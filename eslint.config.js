import js from '@eslint/js'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginPrettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // ignores
  { ignores: ['dist'] },
  // default
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'off'
    }
  },
  // prettier
  {
    name: 'prettier',
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  // perfectionist
  {
    name: 'perfectionist',
    plugins: {
      perfectionist: pluginPerfectionist
    },
    rules: {
      'perfectionist/sort-classes': 'error',
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: {
            type: {
              src: 'src'
            },
            value: {
              src: ['^@/']
            }
          },
          groups: [
            ['external-type', 'builtin-type', 'type'],
            ['parent-type', 'sibling-type', 'index-type'],
            ['internal-type'],
            'builtin',
            'src',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'side-effect',
            'side-effect-style',
            'style',
            'object',
            'unknown'
          ],
          internalPattern: ['^~/.*'],
          newlinesBetween: 'always',
          partitionByComment: ['^Part:.*$']
        }
      ],
      'perfectionist/sort-interfaces': 'error',
      'perfectionist/sort-named-exports': 'error',
      'perfectionist/sort-named-imports': 'error',
      'perfectionist/sort-object-types': 'error',
      'perfectionist/sort-objects': [
        'error',
        {
          // customGroups: {
          //   items: 'items',
          //   list: 'list',
          //   children: 'children'
          // },
          // groups: ['unknown', 'items', 'list', 'children'],
          // ignorePattern: ['children'],
          partitionByComment: ['^Part:.*$']
        }
      ],
      'perfectionist/sort-union-types': 'error'
    },
    settings: {
      perfectionist: {
        order: 'asc',
        type: 'natural'
      }
    }
  },
  // Rules
  {
    rules: {
      /* Typescript */
      // 关闭命名空间
      '@typescript-eslint/no-namespace': 'off',
      /* React */
      // 关闭 exhaustive-deps
      'react-hooks/exhaustive-deps': 'off'
    }
  }
)
