/** @type {import('lint-staged').Config} */
export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '*.{js,jsx,ts,tsx,json,css,md}': ['prettier --write'],
};
