module.exports = {
  '*.md': ['prettier --cache --ignore-unknown --write'],
  '*.{js,jsx,ts,tsx}': [
    'prettier --cache --ignore-unknown  --write',
    'eslint --cache --fix'
  ],
  '*.{scss,html,css}': [
    'prettier --cache --ignore-unknown --write',
    'stylelint --fix --allow-empty-input'
  ],
  'package.json': ['prettier --cache --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
    'prettier --cache --write--parser json'
  ]
}
