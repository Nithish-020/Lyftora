// ESLint flat config (v9). Uses Expo's default rule pack.
const expoConfig = require('eslint-config-expo/flat');

module.exports = [
  ...expoConfig,
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'android/**',
      'ios/**',
      'dist/**',
      'design-tokens/**',
      'src/theme/tokens.generated.*',
    ],
  },
  {
    rules: {
      // React Native renders <Text>, not HTML — no need to escape apostrophes/quotes.
      'react/no-unescaped-entities': 'off',
    },
  },
];
