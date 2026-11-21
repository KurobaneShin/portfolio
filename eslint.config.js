import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".output/", ".vercel/", "build/", "node_modules/", "app/routeTree.gen.ts"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    settings: { react: { version: "detect" } },
    rules: {
      "@typescript-eslint/no-empty-object-type": "off", // shadcn input/textarea props
      "@typescript-eslint/no-namespace": "off", // ProcessEnv typing in env.server
      "@typescript-eslint/no-require-imports": "off", // tailwind plugin
      "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
      "jsx-a11y/media-has-caption": "off", // reel has no speech track
    },
  },
);
