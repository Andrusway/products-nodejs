import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginImport from "eslint-plugin-import";

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      import: eslintPluginImport,   // <-- Важливо додати плагин
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], //
      // правило для обов'язкового .js у імпортах
      "import/extensions": ["error", "always", { js: "always", ignorePackages: true }],
    },
  }

]);
